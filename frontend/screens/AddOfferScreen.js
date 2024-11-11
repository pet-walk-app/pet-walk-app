import NoStatusBarView from "../components/NoStatusBarView";
import { ScrollView, View, Text } from "react-native";
import FormBigInput from "../components/FormBigInput";
import DatePicker from "../components/DatePicker";
import FormInput from "../components/FormInput";
import { formStyles } from "../styles/formStyles";
import { useState } from "react";
import { getFutureDate } from "../utils/commonUtils";
import { Picker } from "@react-native-picker/picker";
import TimePicker from "../components/TimePicker";

export default function AddOfferScreen({navigation}) {

    const [street, setStreet] = useState('')
    const [apartmentNo, setApartmentNo] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [city, setCity] = useState('')
    const [walkDate, setWalkDate] = useState(new Date())

    return (
    <NoStatusBarView padding={40}>

        <Text style={formStyles.h1}>Uzupełnij dane oferty</Text>

        <ScrollView>
            <View style={formStyles.formContainer}>

                <View style={formStyles.formSection}>
                    <Text style={formStyles.sectionHeader}>Wybierz zwierzaka</Text>
                    <View 
                        style={formStyles.formInput}>
                        <Picker>
                            
                        </Picker>
                    </View>

                </View>

                <View style={formStyles.formSection}>
                    <Text style={formStyles.sectionHeader}>Miejsce spaceru</Text>
                    <FormInput 
                        value={street}
                        setValue={setStreet}
                        placeholder={'Ulica'}>
                    </FormInput>
                    <FormInput 
                        value={apartmentNo}
                        setValue={setApartmentNo}
                        placeholder={'Numer domu/mieszkania'}>
                    </FormInput>
                    <FormInput 
                        value={zipCode}
                        setValue={setZipCode}
                        placeholder={'Kod pocztowy'}>
                    </FormInput>
                    <FormInput 
                        value={city}
                        setValue={setCity}
                        placeholder={'Miasto'}>
                    </FormInput>
                </View>

                <View style={formStyles.formSection}>
                    <Text style={formStyles.sectionHeader}>Data spaceru</Text>
                    <DatePicker
                        date={walkDate}
                        setDate={setWalkDate}
                        dateMax = {getFutureDate(0, 2, 0)}>
                    </DatePicker>
                    <TimePicker
                        time={walkDate}
                        setTime={setWalkDate}>
                    </TimePicker>
                    
                </View>
            </View> 

        </ScrollView>

    </NoStatusBarView>
    );
}