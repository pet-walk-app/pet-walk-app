import { View, Text } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import FormInput from "../components/FormInput";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { green, white } from "../consts/colors";
import DatePicker from "../components/DatePicker";

export default function FirstVisitFormScreen() {
   const [username, setUsername] = useState('')
   const [phoneNumber, setPhoneNumber] = useState('')
   const [birthdate, setBirthdate] = useState(new Date(1990, 1, 1))

    return (
        <View style={formStyles.container}>
            <View style={formStyles.topSection}></View>

            <View style={formStyles.middleSection}>
               <Text style={formStyles.h1}>To Twoja pierwsza wizyta w {"\n"}Pet Walk, uzupełnij swoje informacje.</Text>
               <View style={formStyles.formContainer}>
                  <FormInput 
                     value={username}
                     setValue={setUsername}
                     placeholder={'Nazwa użytkownika'}>
                  </FormInput>
                  <FormInput 
                     value={phoneNumber}
                     setValue={setPhoneNumber}
                     placeholder={'Numer telefonu'}>
                  </FormInput>
                  <DatePicker
                     birthdate={birthdate}
                     setBirthdate={setBirthdate}>
                     
                  </DatePicker>
               </View>

               <CustomButton 
                     color={green} 
                     textColor={white}
                     action={''}
                     title={'Kontynuuj'}>
                  </CustomButton>
                  <CustomButton 
                     color={white} 
                     textColor={green}
                     action={''}
                     title={'Wyloguj się'}>
               </CustomButton>

            </View>

            <View style={formStyles.bottomSection}></View>

        </View>
    );
}