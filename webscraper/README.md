# Python Disaster Webscraper

A Python web scraper service to scrape articles from websites and geocode their locations.

Populates prototype with organic disaster news data from historical or real-time data for research purposes only.

## Setup

1. Create `.env` file with the following:

```
MAPBOX_API_KEY=
OPENAI_API_KEY=
NEWS_POST_HTTP=http://localhost:3001/api/news
```

Provide your own mapbox and openai API keys or contact us for them.
  
2. (Optional) Setup a python virtual environment.

```bash
$ python -m venv venv
$ venv\Scripts\activate
```

3. Install dependencies.

```bash
$ pip install -r requirements.txt
$ python -m spacy download en_core_web_trf
```

4. Run script

```bash
$ python script.py
```

## Data Source

You can change the data source in code to use either NZHerald RSS or your own CSV in the `dataset` folder.

In `Source.py` file create a new concrete class implementation of the abstract class and add your data source.

Then create a new instance of it `script.py` and inject it into the `Pipeline` class.
