import { View, Text } from "react-native";
import { formStyles } from "../styles/formStyles";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { green, white } from "../consts/colors";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";


export default function RegistrationScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <NoStatusBarView>
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
          action={() => navigation.navigate('Login Screen')}
          title={'Kontynuuj'}>
        </CustomButton>
      </View>
      <View style={formStyles.bottomSection}></View>
  </NoStatusBarView>
  );
}