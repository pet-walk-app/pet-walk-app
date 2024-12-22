import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { formStyles } from "../styles/formStyles";
import {EXPO_PUBLIC_GOOGLE_MAPS_API_KEY} from '@env';

const GooglePlacesInput = ({onPlaceSelected}) => {
    return (
        <GooglePlacesAutocomplete
            placeholder="Wyszukaj miejsce"
            onPress={(data, details = null) => {
                if (!details || !details.address_components) {
                    alert("Unable to fetch address details. Please try again.");
                    return;
                }

                const postalCode = details.address_components.find((comp) =>
                    comp.types.includes("postal_code")
                )?.long_name || "";
                const city = details.address_components.find((comp) =>
                    comp.types.includes("locality")
                )?.long_name || "";

                if (!postalCode || !city) {
                    alert("Wprowadź poprawny adres.");
                    return;
                }

                const latitude = details.geometry?.location?.lat || null;
                const longitude = details.geometry?.location?.lng || null;

                if (onPlaceSelected) {
                    onPlaceSelected({
                        formattedAddress: data.structured_formatting?.main_text,
                        postalCode,
                        city,
                        latitude,
                        longitude,
                    });
                }
            }}
            query={{
                key: EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                language: "pl",

            }}
            textInputProps={{
                style: [formStyles.formInput],
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            autoFocus={true}
            debounce={300}
        />
    );
};

export default GooglePlacesInput;