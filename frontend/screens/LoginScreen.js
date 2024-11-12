import { useState } from "react";
import { View, Text, StatusBar } from "react-native";
import { formStyles } from "../styles/formStyles";
import { loginStyles } from "../styles/loginFirstVisitStyles";
import { green, white } from "../consts/colors";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import Carousel from "../components/Carousel";
import NoStatusBarView from "../components/NoStatusBarView";


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <NoStatusBarView>
      <StatusBar hidden></StatusBar>
      <View style={formStyles.topSection}></View>
      <View style={formStyles.middleSection}>
        <Carousel></Carousel>
        <Text style={formStyles.h1}>Aby przejść dalej, zaloguj się{"\n"}na konto</Text>
        <View style={loginStyles.formContainer}>
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
          {/* <Pressable>
            <Text style={loginStyles.forgotPasswordText}>Nie pamiętam hasła</Text>
          </Pressable> */}
        </View>

        <CustomButton 
          color={green} 
          textColor={white}
          action={() => navigation.navigate('First Visit Form')}
          title={'Kontynuuj'}>
        </CustomButton>
        <CustomButton 
          color={white} 
          textColor={green}
          action={() => navigation.navigate('Registration Screen')}
          title={'Załóż konto'}>
        </CustomButton>
      </View>

      <View style={formStyles.bottomSection}></View>
    </NoStatusBarView>
  );
}