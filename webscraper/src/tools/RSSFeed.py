from enum import Enum


class RSSFeed(Enum):
    NZHERALD_NEW_ZEALAND = "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh"
    RNZ_NEW_ZEALAND = "https://www.rnz.co.nz/rss/national.xml"
    STUFF = "https://www.stuff.co.nz/rss"
