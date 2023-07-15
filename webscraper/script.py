import openai
from dotenv import dotenv_values
from geopy.geocoders import Nominatim
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

from pipeline import Pipeline, RSSFeed, NewsSite

env_vars = dotenv_values()


def main():
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Firefox(options=options)
    openai.api_key = env_vars["OPENAI_API_KEY"]
    geocoder = Nominatim(user_agent="john@gmail.com")

    pipeline = Pipeline(openai=openai,
                        webdriver=driver,
                        geocoder=geocoder,
                        rss_feed=RSSFeed.NZHERALD_NEW_ZEALAND,
                        news_site=NewsSite.NZHERALD,
                        news_post_http=env_vars["NEWS_POST_HTTP"])

    pipeline.execute()


if __name__ == '__main__':
    main()
