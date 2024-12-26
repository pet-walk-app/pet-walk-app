import * as Location from 'expo-location';
import {LocationAccuracy} from "expo-location/src/Location.types";

export const getGeoLocation = async () => {
    const requestLocationPermission = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        return status === 'granted';
    }

    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
        throw new Error('Location permission denied');
    }

    const location = await Location.getCurrentPositionAsync({
        accuracy: LocationAccuracy.Highest,
        distanceInterval: 100,
    });

    const {coords: {latitude, longitude}} = location;
    return {latitude, longitude};
};