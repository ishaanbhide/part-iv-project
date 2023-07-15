import re
from abc import ABC, abstractmethod
from typing import Tuple

from bs4 import BeautifulSoup


class Scraper(ABC):

    def __init__(self, webdriver):
        self.webdriver = webdriver

    @abstractmethod
    def scrape(self, link: str, word_limit=100) -> Tuple[str, str]:
        pass


class NZHeraldScraper(Scraper):
    def scrape(self, link: str, word_limit=100) -> Tuple[str, str]:
        """
        Scrape the article and header image from the link using selenium to overcome dynamic loading.
        :param link: link to the news article
        :param word_limit: limit the number of words in the article
        :return: cleaned article text and header image url tuple pair
        """
        print("Scraping article...", link)
        self.webdriver.get(link)
        soup = BeautifulSoup(self.webdriver.page_source, 'html.parser')
        article = image = ""

        section = soup.find('section', attrs={"data-ref-group": "body"})
        if section:
            p_tags = section.find_all('p')
            article_raw = " ".join([p.text for p in p_tags])
            article_truncated = " ".join(article_raw.split()[:word_limit])
            article = re.sub(r"[^a-zA-Z0-9\s]", "", article_truncated)

        figure = soup.find("figure", class_="header__figure")
        if figure:
            image = figure.img["src"]

        return article, image
