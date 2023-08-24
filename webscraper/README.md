# Python Disaster Webscraper

A python webscraper service to scrape articles from websites and geocode their locations.
Populates prototype with organic disaster news data. For research purposes only.

## Setup

1. Navigate into `./webscraper`
2. Acquire `.env` file from us.
3. Setup python virtual environment

```bash
$ python -m venv venv
$ venv\Scripts\activate
```

3. Install dependencies

```bash
$ pip install -r requirements.txt
$ python -m spacy download en_core_web_trf
```

4. Run flask app

```bash
$ python app.py
```

## TODO

- [ ] Swap Nominatim geocoder for one which handles fuzzy addresses
- [ ] Add support for more websites
- [ ] Acquire a labelled dataset of articles
- [ ] Benchmark location extraction on the dataset
