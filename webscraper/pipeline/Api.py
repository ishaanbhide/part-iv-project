import requests


class Api:
    def __init__(self, post_url):
        self.post_url = post_url

    def post_news(self, title: str, body: str, image: str, longitude: float, latitude: float) -> None:
        news = {
            "title": title,
            "body": body,
            "source": "NZ Herald",
            "image": image,
            "location": {
                "type": "Point",
                "coordinates": [longitude, latitude]
            }
        }

        try:
            response = requests.post(self.post_url, json=news)
            if response.status_code in [200, 201]:
                print('Post successful:', response.json())
            else:
                print('Post unsuccessful:', response.text)
        except requests.exceptions.RequestException as e:
            print(f"Failed to connect to {self.post_url}: {str(e)}")
