# Part IV Project
- Title: Analysis of News Sources to Provide Localised Disaster Information
- Researchers: Ishaan Bhide and Matthew Ouyang

## Summary
Effective information delivery is crucial, particularly in high-stress disaster situations. Current disaster information systems, including social media, news websites, specially designed software, and emergency alert systems, often lack standardisation, accessibility, and usability. Many of these tools do not offer a visually intuitive experience. For this research project, we created two prototypes—a map-based disaster news application and a newsfeed-based counterpart by leveraging modern technologies such as React, Express, and Python. Our primary objective of this project was to explore how users perceive the usability of a map-based disaster information system and its ability to communicate disaster news compared to a conventional newsfeed system.

## Repository Details
- `./client-map` folder contains the React repository for the map-based disaster news app
- `./client-newsfeed` folder contains the React repository for the newsfeed-based disaster news app
- `./server` folder contains the Express repository for the backend API consumed by both client apps
- `./webscraper` folder contains the Python microservice pipeline for webscraping and processing news data from the internet
- `./statistics` folder contains the Jupyter notebook for the statistical analysis of our research results

## Docker

To build `newsfeed` and `map` app images, ensure you have docker desktop install. Then run

```bash
$ docker-compose up --build
```


