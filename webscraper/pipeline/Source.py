import re
from abc import ABC, abstractmethod
from typing import List

import feedparser
import pandas as pd

DISASTER_KEYWORDS = ['flood', 'quake', 'storm', 'disaster', 'hurricane', 'tornado', 'fire', 'cyclone', 'caution',
                     'crash', 'accident', 'collision', 'smash', 'wreck', 'pileup', 'smashup', 'disaster', 'catastrophe']


class Source(ABC):

    @abstractmethod
    def get_links(self) -> List[str]:
        pass


class SourceFactory:
    @staticmethod
    def create_source(source: str, uri: str) -> Source:
        if source == "rss":
            return RssSource(uri)
        elif source == "csv":
            return CsvSource(uri)
        else:
            raise ValueError(f"No source available for: {source}")


class RssSource(Source):

    def __init__(self, rss_feed: str):
        self.rss_feed = rss_feed

    def get_links(self) -> List[str]:
        feed = feedparser.parse(self.rss_feed)
        disasters = []

        for entry in feed.entries:
            title = re.sub(r"[^a-zA-Z0-9\s]", "", entry.title)

            # todo: improve classification algorithm
            if any(keyword in title.lower() for keyword in DISASTER_KEYWORDS):
                disasters.append(entry.link)

        return disasters


class CsvSource(Source):
    def __init__(self, csv_file_path: str):
        self.csv_file_path = csv_file_path

    def get_links(self) -> List[str]:
        df = pd.read_csv(self.csv_file_path, usecols=[0])
        array = df['Links'].to_numpy()
        return array
