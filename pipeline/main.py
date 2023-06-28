import re

import feedparser
import openai
import requests
import spacy
from bs4 import BeautifulSoup
from geopy.geocoders import Nominatim

NZ_HERALD_RSS = "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh"
TEST_LINK = "https://www.nzherald.co.nz/nz/auckland-weather-surface-flooding-near-harbour-bridge-as-heavy-rain-begins/MRKSSJZE3FGHTHHBGGOFNMX3MA/"

openai.api_key = "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"
nlp = spacy.load("en_core_web_sm")
geocoder = Nominatim(user_agent="my_app")


def nzherald_rss():
    feed = feedparser.parse(NZ_HERALD_RSS)
    disasters = []
    for entry in feed.entries:
        clean_title = re.sub(r"[^a-zA-Z0-9\s]", "", entry.title)
        prompt = f'"""{clean_title}""" classify news headline into NATURAL DISASTER, ACCIDENTS or OTHER'
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=10,
        )

        print(clean_title, ",", completion.choices[0].message.content)
        response = completion.choices[0].message.content.upper()

        if "NATURAL DISASTER" in response or "ACCIDENTS" in response:
            disasters.append((entry.title, entry.link))

    return disasters


def extract(link: str):
    r = requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')

    text = soup.find_all('p')
    article = ""
    for paragraph in text:
        article += paragraph.text + " "

    doc = nlp(article)

    print(article)

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user",
             "content": f'extract locations from the article delimited by triple quotes: """${article}"""'},
        ]
    )

    try:
        content = completion.choices[0].message.content
        locations = [item.strip("- ") for item in content.split("\n")]
        print(locations)


    except Exception as e:
        print("Error occurred while converting chatgpt content to array", str(e))


def main():
    disasters = nzherald_rss()
    print(disasters)


if __name__ == "__main__":
    main()
