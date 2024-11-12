import { View, Text } from "react-native";
import { useState } from "react";
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import DatePicker from "../components/DatePicker";
import NoStatusBarView from "../components/NoStatusBarView";

export default function FirstVisitFormScreen({navigation}) {
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [birthdate, setBirthdate] = useState(new Date(1990, 1, 1))

  return (
    <NoStatusBarView>
      <View style={formStyles.topSection}></View>
      <View style={formStyles.middleSection}>
        <Text style={formStyles.h1}>To Twoja pierwsza wizyta w {"\n"}Pet Walk, uzupełnij swoje informacje</Text>
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
            date={birthdate}
            setDate={setBirthdate}
            dateMin={new Date(1990, 1, 1)}
            >
          </DatePicker>
        </View>

        <CustomButton 
          color={green} 
          textColor={white}
          action={() => navigation.navigate('First Visit Profile Choice')}
          title={'Kontynuuj'}>
        </CustomButton>
        <CustomButton 
          color={white} 
          textColor={green}
          action={() => navigation.navigate('Login Screen')}
          title={'Wyloguj się'}>
        </CustomButton>
      </View>
      <View style={formStyles.bottomSection}></View>
    </NoStatusBarView>
  );
}