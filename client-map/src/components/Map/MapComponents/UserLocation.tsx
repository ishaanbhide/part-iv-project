import { MarkerF } from "@react-google-maps/api";
import { getUserLocation } from "../../../utils/getUserLocation";
import { Coordinates } from "../../../models/Coordinates";
import { useEffect, useState } from "react";

export function UserLocationMarker() {
    const [userLocation, setUserLocation] = useState<Coordinates>({
        lat: 0,
        lng: 0,
    });

    useEffect(() => {
        async function fetchUserLocation() {
            const location = await getUserLocation();
            location && setUserLocation(location);
        }
        fetchUserLocation();
    }, []);

    const userLocationMarkerOptions = {
        icon: {
            url: "./your-location.png",
            anchor: new google.maps.Point(60, 60),
            scaledSize: new google.maps.Size(120, 120),
        },
    };

    return (
        <MarkerF position={userLocation} options={userLocationMarkerOptions} />
    );
}
