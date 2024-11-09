import { View, Text } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { green, white } from "../consts/colors";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";


export default function RegistrationScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View style={formStyles.container}>
      <StatusBar hidden></StatusBar>
      <View style={formStyles.middleSection}>
        <Text style={formStyles.h1}>Załóż konto</Text>
        <View style={formStyles.formContainer}>
          <FormInput 
            value={email}
            setValue={setEmail}
            placeholder={'E-mail'}>
          </FormInput>
          <FormInput 
            value={password}
            setValue={setPassword}
            placeholder={'Hasło'}>
          </FormInput>
        </View>

        <CustomButton 
          color={green} 
          textColor={white}
          action={''}
          title={'Kontynuuj'}>
        </CustomButton>
      </View>
      <View style={formStyles.bottomSection}></View>
  </View>
  );
}