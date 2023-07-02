import re
import time

import feedparser
import openai
import requests
import spacy
from bs4 import BeautifulSoup
from geopy.geocoders import Nominatim

NZ_HERALD_RSS = "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh"
openai.api_key = "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"
nlp = spacy.load("en_core_web_sm")
geocoder = Nominatim(user_agent="wouy448@aucklanduni.ac.nz")

ARTICLE_WORD_LIMIT = 100
LOCATIONS_LIMIT = 5


def get_disasters():
    feed = feedparser.parse(NZ_HERALD_RSS)
    disasters = []
    tokens = 0

    for entry in feed.entries:
        clean_title = re.sub(r"[^a-zA-Z0-9\s]", "", entry.title)

        prompt = f'"""{clean_title}""" classify news headline into NATURAL DISASTER, ACCIDENTS, WEATHER or OTHER'
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=10,
            temperature=0,
        )

        response = completion.choices[0].message.content.upper()
        tokens += completion.usage.total_tokens

        if "NATURAL DISASTER" in response or "ACCIDENTS" in response or "WEATHER" in response:
            disasters.append((entry.title, entry.link))

        print(clean_title, ":", completion.choices[0].message.content)

    print("Total tokens used:", tokens)
    print(disasters)

    return disasters


def scrape_article(link: str):
    r = requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')

    text = soup.find_all('p')
    article_raw = " ".join([paragraph.text for paragraph in text])
    article_truncated = " ".join(article_raw.split()[:ARTICLE_WORD_LIMIT])
    article = re.sub(r"[^a-zA-Z0-9\s]", "", article_truncated)

    return article


def extract_potential_locations(article: str):
    prompt = f'"""{article}""" extract location data from text as bullet points'
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=30,
        temperature=0,
    )

    locations = re.findall(r'- (.+)', completion.choices[0].message.content)

    print(completion.choices[0].message.content)
    print("Total tokens used:", completion.usage.total_tokens)
    print(locations)

    return locations[:LOCATIONS_LIMIT]


def geocode(location: str):
    response = geocoder.geocode(f"{location} New Zealand")
    time.sleep(1)
    return response.raw if response else None


def main():
    disasters = get_disasters()
    for title, link in disasters:
        article = scrape_article(link)
        locations = extract_potential_locations(article)
        geocoded_locations = list(filter(None, (geocode(location) for location in locations)))
        if geocoded_locations:
            best_location = min(geocoded_locations, key=lambda loc: loc['importance'])
            print(best_location['display_name'])
        else:
            print("No locations found")


if __name__ == "__main__":
    main()
