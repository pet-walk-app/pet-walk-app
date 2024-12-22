import React from "react";
import { View, StyleSheet } from "react-native";
import GooglePlacesInput from "../components/GooglePlacesInput";
import {formStyles} from "../styles/formStyles";

export const PlaceSelectionScreen = ({ route, navigation }) => {
    const handlePlaceSelected = (place) => {
        route.params?.onPlaceSelected(place);
        navigation.goBack();
    };

    return (
        <View style={formStyles.middleSection}>
            <GooglePlacesInput onPlaceSelected={handlePlaceSelected} />
        </View>
    );
}