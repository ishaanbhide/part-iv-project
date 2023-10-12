export const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: false,
  minZoom: 6,
  maxZoom: 15,
  styles: [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "geometry.fill",
      stylers: [
        {
          color: "#e7f5f4",
        },
      ],
    },
    {
      featureType: "landscape.man_made",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.natural",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape.natural.landcover",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: "#00ffb7",
        },
        {
          saturation: "-16",
        },
        {
          lightness: "-16",
        },
      ],
    },
    {
      featureType: "landscape.natural.landcover",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.attraction",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.attraction",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "geometry",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: "#00ffb7",
        },
        {
          saturation: "-16",
        },
        {
          lightness: "-10",
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.government",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.government",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.government",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.medical",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.medical",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: "#00ffb7",
        },
        {
          saturation: "-16",
        },
        {
          lightness: "-10",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.place_of_worship",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.place_of_worship",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.place_of_worship",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.school",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.school",
      elementType: "geometry.fill",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.school",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      elementType: "all",
      stylers: [
        {
          visibility: "on",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      elementType: "geometry.fill",
      stylers: [
        {
          hue: "#00ffb7",
        },
        {
          saturation: "-16",
        },
        {
          lightness: "-16",
        },
      ],
    },
    {
      featureType: "poi.sports_complex",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#5f7e96",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};
