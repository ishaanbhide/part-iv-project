from dotenv import dotenv_values
from geopy.geocoders import MapBox

env_vars = dotenv_values()

geocoder = MapBox(api_key=env_vars["MAPBOX_API_KEY"])
location = geocoder.geocode("State Highway 2, Karangahake Gorge, New Zealand")
print(location)
print(location.latitude)
print(location.longitude)
