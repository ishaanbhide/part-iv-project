import atexit

import openai
from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask
from geopy.geocoders import Nominatim
from selenium import webdriver
from selenium.webdriver.firefox.options import Options

from tools import Pipeline, RSSFeed, NewsSite

NEWS_POST_HTTP = "http://localhost:3001/api/news"
OPENAI_API_KEY = "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"

app = Flask(__name__)
scheduler = BackgroundScheduler()

options = Options()
options.add_argument('--headless')
options.add_argument('--log-level=0')
driver = webdriver.Firefox(options=options)
openai.api_key = OPENAI_API_KEY
geocoder = Nominatim(user_agent="john@gmail.com")

pipeline = Pipeline(openai=openai,
                    webdriver=driver,
                    geocoder=geocoder,
                    rss_feed=RSSFeed.NZHERALD_NEW_ZEALAND,
                    news_site=NewsSite.NZHERALD,
                    news_post_http=NEWS_POST_HTTP)


@atexit.register
def cleanup():
    driver.quit()


def run():
    pipeline.execute()


if __name__ == "__main__":
    scheduler.add_job(func=run, trigger="interval", minutes=60)
    scheduler.start()

    run()  # run once on startup

    app.run(host="localhost", port=5000)
