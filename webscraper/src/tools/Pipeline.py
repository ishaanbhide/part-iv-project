import re
import time
from typing import List, Tuple

import feedparser
import requests

from .NewsSite import NewsSite
from .RSSFeed import RSSFeed
from .Scraper import Scraper, NZHeraldScraper

DISASTER_KEYWORDS = ['flood', 'quake', 'storm', 'disaster', 'hurricane', 'tornado', 'fire', 'cyclone', 'caution',
                     'crash', 'accident', 'collision', 'smash', 'wreck', 'pileup', 'smashup', 'disaster', 'catastrophe']


class Pipeline:
    def __init__(self, openai, webdriver, geocoder, rss_feed: RSSFeed, news_site: NewsSite, news_post_http: str):
        self.openai = openai
        self.webdriver = webdriver
        self.geocoder = geocoder
        self.rss_feed = rss_feed.value
        self.scraper = self.get_scraper(news_site)
        self.news_post_http = news_post_http

    def get_scraper(self, site: NewsSite) -> Scraper:
        if site is NewsSite.NZHERALD:
            return NZHeraldScraper(self.webdriver)
        else:
            raise ValueError(f"No scraper available for site: {site}")

    def execute(self):
        disasters = self.get_disasters_rss()
        for title, link in disasters:
            print("Processing disaster...", title)

            article, image = self.scraper.scrape(link)
            locations = self.extract_locations(article)
            geocoded_location = self.try_geocode_locations(locations)
            if geocoded_location:
                self.post_news(title, article, image, geocoded_location.longitude, geocoded_location.latitude)
            else:
                print("No geocodable locations")

    @staticmethod
    def is_disaster_related(title: str) -> bool:
        """
        Check if the title is disaster related.
        :param title: headline of the news article
        :return: True if the title is disaster related, False otherwise
        """
        return any(keyword in title.lower() for keyword in DISASTER_KEYWORDS)

    def get_disasters_rss(self) -> List[Tuple[str, str]]:
        """
        Get the list of disasters from NZ Herald RSS feed.
        :return: list of algorithmically classified disasters
        """
        print("Scanning rss feeds...")
        feed = feedparser.parse(self.rss_feed)
        disasters = []

        for entry in feed.entries:
            title = re.sub(r"[^a-zA-Z0-9\s]", "", entry.title)
            print(title)
            if self.is_disaster_related(title):
                disasters.append((entry.title, entry.link))

        print("Disasters found:", disasters)

        return disasters

    def extract_locations(self, article: str, limit=5) -> List[str]:
        """
        Extract locations from the article using openai GPT-3. An alternative is to classical NLP NER.
        :param article: string of the article
        :param limit: limit the number of locations extracted
        :return: list of locations extracted
        """
        prompt = f'"""{article}""" extract searchable locations from text as bullet points. Direct answer.'
        completion = self.openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=30,
            temperature=0,
        )

        locations = re.findall(r'- (.+)', completion.choices[0].message.content)
        print("Possible locations:", locations)
        print("Tokens used in extraction:", completion.usage.total_tokens)

        return locations[:limit]

    def try_geocode_locations(self, locations: List[str]):
        """
        Grab the first geocoded location from the list of locations.
        :param locations: list of locations to geocode
        :return: geocoded geopy location
        """
        for location in locations:
            response = self.geocoder.geocode(f"{location} New Zealand")
            if response:
                print(f"Valid location found: {location} -> {response}")
                return response

            time.sleep(1)

        return None

    def post_news(self, title: str, body: str, image: str, longitude: float, latitude: float) -> None:
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

        print("Posting...", news)
        try:
            response = requests.post(self.news_post_http, json=news)
            if response.status_code in [200, 201]:
                print('Post successful:', response.json())
            else:
                print('Post unsuccessful:', response.text)
        except requests.exceptions.RequestException as e:
            print(f"Failed to connect to {self.news_post_http}: {str(e)}")
