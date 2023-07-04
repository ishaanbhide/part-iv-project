import re
import time
from typing import List, Tuple

import feedparser
import openai
import requests
from bs4 import BeautifulSoup
from geopy.geocoders import Nominatim
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

# constants
SERVER_NEWS_API = "http://localhost:3001/api/news"
NZ_HERALD_RSS = "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh"
DISASTER_KEYWORDS = ['flood', 'earthquake', 'storm', 'disaster', 'hurricane', 'tornado', 'wildfire']

# openai and nominatim setup
openai.api_key = "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"
geocoder = Nominatim(user_agent="jameswood@gmail.com")

# selenium webdriver setup
options = Options()
options.add_argument('--headless')
driver = webdriver.Firefox(options=options)


def is_disaster_related(title: str) -> bool:
    """
    Check if the title is disaster related.
    :param title: headline of the news article
    :return: True if the title is disaster related, False otherwise
    """
    return any(keyword in title.lower() for keyword in DISASTER_KEYWORDS)


def is_disaster_related_gpt(title: str) -> bool:
    """
    Use openai GPT-3 to classify if the title is disaster related.
    :param title: headline of the news article
    :return: True if the title is disaster related, False otherwise
    """
    prompt = f'"""{title}""" classify news headline into NATURAL DISASTER, WEATHER or OTHER'
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=10,
        temperature=0,
    )

    response = completion.choices[0].message.content.upper()
    print("Disasters found:", title, ":", completion.choices[0].message.content)

    return True if "NATURAL DISASTER" in response or "WEATHER" in response else False


def get_disasters_rss() -> List[Tuple[str, str]]:
    """
    Get the list of disasters from NZ Herald RSS feed.
    :return: list of algorithmically classified disasters
    """
    print("Scanning rss feeds...")
    feed = feedparser.parse(NZ_HERALD_RSS)
    disasters = []

    for entry in feed.entries:
        title = re.sub(r"[^a-zA-Z0-9\s]", "", entry.title)
        if is_disaster_related(title):
            disasters.append((entry.title, entry.link))

    print("Disasters found:", disasters)

    return disasters


def scrape_article(link: str, word_limit=100) -> Tuple[str, str]:
    """
    Scrape the article and header image from the link using selenium to overcome dynamic loading.
    :param link: link to the news article
    :param word_limit: limit the number of words in the article
    :return: cleaned article text and header image url tuple pair
    """
    print("Scraping article:", link)
    driver.get(link)
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    article = image = ""

    section = soup.find('section', attrs={"data-ref-group": "body"})
    if section:
        p_tags = section.find_all('p')
        article_raw = " ".join([p.text for p in p_tags])
        article_truncated = " ".join(article_raw.split()[:word_limit])
        article = re.sub(r"[^a-zA-Z0-9\s]", "", article_truncated)

    figure = soup.find("figure", class_="header__figure")
    if figure:
        image = figure.img["src"]

    return article, image


def extract_locations(article: str, limit=5) -> List[str]:
    """
    Extract locations from the article using openai GPT-3. An alternative is to classical NLP NER.
    :param article: string of the article
    :param limit: limit the number of locations extracted
    :return: list of locations extracted
    """
    prompt = f'"""{article}""" extract searchable locations from text as bullet points. Direct answer.'
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=30,
        temperature=0,
    )

    locations = re.findall(r'- (.+)', completion.choices[0].message.content)
    print("Possible locations:", locations)
    print("Tokens used in extraction:", completion.usage.total_tokens)

    return locations[:limit]


def try_geocode_locations(locations: List[str]):
    """
    Geocode the locations using geopy Nominatim, respecting usage frequency limit.
    :param locations: list of locations to geocode
    :return: list of geocoded geopy location objects
    """
    for location in locations:
        response = geocoder.geocode(f"{location} New Zealand")
        if response:
            return response

        time.sleep(1)

    return None


def post_news(title: str, body: str, image: str, longitude: float, latitude: float) -> None:
    """
    Post the news article to the news API.
    :param title: title of the article
    :param body: body of the article
    :param image: header image of the article
    :param longitude: longitude of the article
    :param latitude: latitude of the article
    :return: None
    """
    news = {
        "title": title,
        "body": body,
        "source": "NZ Herald",
        "image": image,
        "location": {
            "type": "Point",
            "coordinates": [longitude, latitude]
        }
    }

    print("POSTing:", news)

    response = requests.post(SERVER_NEWS_API, json=news)
    if response.status_code in [200, 201]:
        print('Post successful:', response.json())
    else:
        print('Post unsuccessful:', response.text)


def main() -> None:
    disasters = get_disasters_rss()
    for title, link in disasters:
        print("Processing disaster:", title)

        article, image = scrape_article(link)
        locations = extract_locations(article)
        geocoded_location = try_geocode_locations(locations)
        if geocoded_location:
            post_news(title, article, image, geocoded_location.longitude, geocoded_location.latitude)
        else:
            print("No geocodable location")

    driver.quit()


if __name__ == "__main__":
    main()
