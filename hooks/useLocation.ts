import {useEffect, useState} from "react";
import * as Location from "expo-location";

export type LocationType = {
    latitude: number
    longitude: number

}


export const useLocation = () => {
    const [location, setLocation] = useState<LocationType>({} as LocationType);
    const getLocation = async () => {
        try {
            const {granted} = await Location.requestForegroundPermissionsAsync()

            if (!granted) return
            const {coords: {longitude, latitude}}: Location.LocationObject = await Location.getCurrentPositionAsync()
            setLocation({latitude, longitude})
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getLocation()
    }, [])
    return location
}