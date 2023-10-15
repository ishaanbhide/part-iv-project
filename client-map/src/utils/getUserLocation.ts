import { Coordinates } from "../models/Coordinates";

export function getUserLocation(): Promise<Coordinates | null> {
    return new Promise(async (resolve, reject) => {
        if (navigator.geolocation) {
            try {
                const position = await new Promise<GeolocationPosition>(
                    (resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(
                            resolve,
                            reject,
                        );
                    },
                );
                const location: Coordinates = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                resolve(location);
            } catch (error) {
                console.log("Error:", error);
                resolve(null);
            }
        } else {
            console.log("Geolocation is not supported by this browser.");
            resolve(null);
        }
    });
}
