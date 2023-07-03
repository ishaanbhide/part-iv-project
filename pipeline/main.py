import re
import time
from typing import List

import feedparser
import openai
import requests
import spacy
from bs4 import BeautifulSoup
from geopy.geocoders import Nominatim

SERVER_NEWS_API = "http://localhost:3001/api/news"
NZ_HERALD_RSS = "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh"
openai.api_key = "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"
nlp = spacy.load("en_core_web_sm")
geocoder = Nominatim(user_agent="jameswood@gmail.com")


def get_disasters():
    feed = feedparser.parse(NZ_HERALD_RSS)
    disasters = []
    tokens = 0

    for entry in feed.entries:
        clean_title = re.sub(r"[^a-zA-Z0-9\s]", "", entry.title)

        prompt = f'"""{clean_title}""" classify news headline into NATURAL DISASTER, WEATHER or OTHER'
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=10,
            temperature=0,
        )

        response = completion.choices[0].message.content.upper()
        tokens += completion.usage.total_tokens

        if "NATURAL DISASTER" in response or "WEATHER" in response:
            disasters.append((entry.title, entry.link))

        print(clean_title, ":", completion.choices[0].message.content)

    print("Total tokens used:", tokens)
    print(disasters)

    return disasters


def scrape_article(link: str, word_limit=100) -> str:
    r = requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')

    text = soup.find_all('p')
    article_raw = " ".join([paragraph.text for paragraph in text])
    article_truncated = " ".join(article_raw.split()[:word_limit])
    article = re.sub(r"[^a-zA-Z0-9\s]", "", article_truncated)
    print(article)

    # TODO: scrape images, from dynamic website using selenium

    return article


def extract_locations(article: str, limit=1) -> List[str]:
    prompt = f'"""{article}""" extract searchable locations from text as bullet points. Direct answer.'
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=30,
        temperature=0,
    )

    locations = re.findall(r'- (.+)', completion.choices[0].message.content)
    print(locations)
    print("Total tokens used:", completion.usage.total_tokens)

    return locations[:limit]


def geocode_locations(locations: List[str]):
    res = []
    for location in locations:
        response = geocoder.geocode(f"{location} New Zealand")
        if response:
            res.append(response)

        time.sleep(1)

    return res


def post_news(title: str, article: str, longitude: float, latitude: float) -> None:
    news = {
        "title": title,
        "body": article,
        "source": "NZ Herald",
        "image": "null",
        "location": {
            "type": "Point",
            "coordinates": [longitude, latitude]
        }
    }

    response = requests.post(SERVER_NEWS_API, json=news)
    if response.status_code in [200, 201]:
        print('Post successful:', response.json())
    else:
        print('Post unsuccessful:', response.text)


def main():
    disasters = get_disasters()
    for title, link in disasters:
        article = scrape_article(link)
        locations = extract_locations(article)
        geocoded_locations = geocode_locations(locations)
        for geocoded_location in geocoded_locations:
            post_news(title, article, geocoded_location.longitude, geocoded_location.latitude)


def test():
    scrape_article(
        "https://www.nzherald.co.nz/talanoa/warning-of-more-cyclones-for-parts-of-pacific-as-el-nino-threatens/QZU7IQLZ2ZF4DD3EGEBOOXAPDY/")


if __name__ == "__main__":
    # main()
    test()
