import re
from abc import ABC, abstractmethod
from typing import Dict

from bs4 import BeautifulSoup


class Scraper(ABC):

    def __init__(self, webdriver):
        self.webdriver = webdriver

    @abstractmethod
    def scrape(self, link: str) -> Dict[str, str]:
        pass


class ScraperFactory:
    @staticmethod
    def create_scraper(site: str, webdriver) -> Scraper:
        if site == 'nzherald':
            return NZHeraldScraper(webdriver)
        else:
            raise ValueError(f"No scraper available for site: {site}")


class NZHeraldScraper(Scraper):
    def scrape(self, link: str, word_count=500) -> Dict[str, str]:
        self.webdriver.get(link)
        soup = BeautifulSoup(self.webdriver.page_source, 'html.parser')
        article = {'title': '', 'body': '', 'image': ''}

        h1 = soup.find("h1", class_="article__heading")
        if h1:
            article['title'] = h1.text

        section = soup.find('section', attrs={"data-ref-group": "body"})
        if section:
            p_tags = section.find_all('p')
            body_raw = " ".join([p.text for p in p_tags])
            body_truncated = " ".join(body_raw.split()[:word_count])
            article['body'] = re.sub(r"[^a-zA-Z0-9\s]", "", body_truncated)

        figure = soup.find("figure", class_="header__figure")
        if figure:
            article['image'] = figure.img["src"]

        return article
