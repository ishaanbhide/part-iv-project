import feedparser
import openai
import requests
import spacy
from bs4 import BeautifulSoup

NZ_HERALD_RSS = "https://www.nzherald.co.nz/arc/outboundfeeds/rss/section/nz/?outputType=xml&_website=nzh"
TEST_LINK = "https://www.nzherald.co.nz/nz/power-lines-strewn-across-road-after-mount-maunganui-crash/JXOQDEMLHZDG3P7XCXTY64HAUY/"

openai.api_key = "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"
nlp = spacy.load("en_core_web_sm")


def extract(link: str):
    r = requests.get(link)
    soup = BeautifulSoup(r.text, 'html.parser')

    text = soup.find_all('p')
    article = ""
    for paragraph in text:
        article += paragraph.text + " "

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user",
             "content": f"Extract addresses, streets, locations from '{article}' and return as a python array"},
        ]
    )

    try:
        locations = eval(completion.choices[0].message.content)
        print(locations)
    except Exception as e:
        print("Error occurred while converting chatgpt content to array", str(e))


def main():
    feed = feedparser.parse(NZ_HERALD_RSS)
    for entry in feed.entries:
        print('Post Title :', entry.title)
        print('Post Summary :', entry.summary)
        print('Post Link :', entry.link)
        print('------------------------')

    extract(TEST_LINK)


if __name__ == "__main__":
    main()
