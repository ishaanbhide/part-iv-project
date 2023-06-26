import feedparser
import requests
import spacy
from bs4 import BeautifulSoup

NZ_HERALD_RSS = "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh"
TEST_LINK = "https://www.nzherald.co.nz/nz/power-lines-strewn-across-road-after-mount-maunganui-crash/JXOQDEMLHZDG3P7XCXTY64HAUY/"

nlp = spacy.load("en_core_web_sm")


def extract(link: str):
    r = requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')

    text = soup.find_all('p')
    article = ""
    for paragraph in text:
        article += paragraph.text + " "

    doc = nlp(article)

    for entity in doc.ents:
        if entity.label_ == "GPE" or entity.label_ == "LOC" or entity.label_ == "FAC" or entity.label_ == "NORP":
            print(entity.text)


def main():
    nlp = spacy.load("en_core_web_sm")

    feed = feedparser.parse(NZ_HERALD_RSS)
    for entry in feed.entries:
        print('Post Title :', entry.title)
        print('Post Summary :', entry.summary)
        print('Post Link :', entry.link)
        print('------------------------')

    extract(TEST_LINK)


if __name__ == "__main__":
    main()
