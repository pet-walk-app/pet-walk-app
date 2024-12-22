import {formStyles} from "../styles/formStyles";
import {Text, View} from "react-native";
import {Controller} from "react-hook-form";
import CustomButton from "./CustomButton";
import {profileStyles} from "../styles/profileStyles";
import {ErrorMessage} from "./ErrorMessage";


export const PlacePickerSection = ({errors, control}) => {
    return (
        <View style={formStyles.formSection}>
            <Text style={formStyles.sectionHeader}>Miejsce odbioru</Text>
            <Controller
                control={control}
                name="place"
                rules={{ required: "Miejsce odbioru jest wymagane" }}
                render={({ field: { onChange, value } }) => (
                    <>
                        <CustomButton
                            color="white"
                            textColor="black"
                            action={() =>
                                navigation.navigate('Place Selection', {
                                    onPlaceSelected: (place) => onChange(place),
                                })
                            }
                            title="Wybierz miejsce odbioru"
                        />
                        {value && (
                            <View>
                                <Text style={[profileStyles.text]}>Adres:</Text>
                                <Text style={[profileStyles.text, profileStyles.boldText]}>{value?.formattedAddress}</Text>
                                <Text style={[profileStyles.text]}>Kod pocztowy:</Text>
                                <Text style={[profileStyles.text, profileStyles.boldText]}>{value?.postalCode}</Text>
                                <Text style={[profileStyles.text]}>Miejscowość:</Text>
                                <Text style={[profileStyles.text, profileStyles.boldText]}>{value?.city}</Text>
                            </View>
                        )}
                        <ErrorMessage errorMessage={errors.place?.message} />
                    </>
                )}
            />
        </View>
    );
}