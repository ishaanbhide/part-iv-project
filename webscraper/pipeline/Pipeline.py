import time

from . import Scraper, Source, Extractor, Api


class Pipeline:
    def __init__(self, source: Source, scraper: Scraper, extractor: Extractor, geocoder, api: Api):
        self.source = source
        self.scraper = scraper
        self.extractor = extractor
        self.geocoder = geocoder
        self.api = api

    def execute(self):
        for link in self.source.get_links():
            print("Scraping...", link)

            article = self.scraper.scrape(link)
            print("Article:", article)

            locations = self.extractor.get_locations(article['title'] + article['body'])
            print("Locations:", locations)

            for location in locations:
                geocode = self.geocoder.geocode(location, country="nz")

                if geocode:
                    print("Geocode found: ", geocode)
                    self.api.post_news(title=article['title'],
                                       body=article['body'],
                                       image=article['image'],
                                       longitude=geocode.longitude,
                                       latitude=geocode.latitude)
                else:
                    print("Geocode failed: ", location)

                time.sleep(0.2)
