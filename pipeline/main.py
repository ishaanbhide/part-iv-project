import re

import feedparser
import openai
import requests
import spacy
from bs4 import BeautifulSoup
from geopy.geocoders import Nominatim

NZ_HERALD_RSS = "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh"
openai.api_key = "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"
nlp = spacy.load("en_core_web_sm")
geocoder = Nominatim(user_agent="my_app")


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


def extract_locations(title: str, link: str):
    r = requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')

    text = soup.find_all('p')
    article = title + ":" + " ".join([paragraph.text for paragraph in text])

    prompt = f'"""{article}""" extract location data from text as bullet points'
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=20,
        temperature=0,
    )

    locations = re.findall(r'- (.+)', completion.choices[0].message.content)

    print(locations)
    print(completion.choices[0].message.content)
    print("Total tokens used:", completion.usage.total_tokens)

    return locations


def main():
    disasters = get_disasters()
    for title, link in disasters:
        locations = extract_locations(title, link)
        # TODO: Geocode locations


def test():
    locations = extract_locations(
        "Auckland commuters warned to take ‘extra care’ on Harbour Bridge due to strong wind gusts ",
        "https://www.nzherald.co.nz/nz/auckland-traffic-builds-as-school-holidays-begin-significant-road-works-in-waikato-continue/3TE4RVBKD5FXLILW6AHXDHXVFM/")


if __name__ == "__main__":
    # main()
    test()
