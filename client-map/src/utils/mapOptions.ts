export const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
  zoom: 15,
  minZoom: 10,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit.line",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#69b6df" }],
    },
  ],
};

export const defaultRadius = 1;
