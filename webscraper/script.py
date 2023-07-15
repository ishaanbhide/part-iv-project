import openai
from geopy.geocoders import Nominatim
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

from pipeline import Pipeline, RSSFeed, NewsSite

NEWS_POST_HTTP = "http://localhost:3001/api/news"
OPENAI_API_KEY = "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"


def main():
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Firefox(options=options)
    openai.api_key = OPENAI_API_KEY
    geocoder = Nominatim(user_agent="john@gmail.com")

    pipeline = Pipeline(openai=openai,
                        webdriver=driver,
                        geocoder=geocoder,
                        rss_feed=RSSFeed.NZHERALD_NEW_ZEALAND,
                        news_site=NewsSite.NZHERALD,
                        news_post_http=NEWS_POST_HTTP)

    pipeline.execute()


if __name__ == '__main__':
    main()
