import openai
from dotenv import dotenv_values
from geopy.geocoders import MapBox
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

from pipeline import Pipeline, ExtractorFactory, ScraperFactory, SourceFactory, Api

env_vars = dotenv_values()


def main():
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Firefox(options=options)

    openai.api_key = env_vars["OPENAI_API_KEY"]

    source = SourceFactory.create_source("csv", "./dataset/nzhearld.csv")
    scraper = ScraperFactory.create_scraper("nzherald", driver)
    # extractor = ExtractorFactory.create_extractor("spacy", spacy.load("en_core_web_sm"))
    extractor = ExtractorFactory.create_extractor("openai", openai)
    geocoder = MapBox(env_vars["MAPBOX_API_KEY"])
    api = Api(env_vars["NEWS_POST_HTTP"])

    pipeline = Pipeline(source=source,
                        scraper=scraper,
                        extractor=extractor,
                        geocoder=geocoder,
                        api=api)

    pipeline.execute()


if __name__ == '__main__':
    main()
