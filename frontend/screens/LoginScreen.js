import { useState } from "react";
import { View, Text, StatusBar, Alert } from "react-native";
import { formStyles } from "../styles/formStyles";
import { loginStyles } from "../styles/loginFirstVisitStyles";
import { green, white } from "../consts/colors";
import { useForm, Controller } from "react-hook-form";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";

import { loginUser } from "../services/authorizationApi";


export default function LoginScreen({navigation}) {

  const [isLogged, setIsLogged] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data)
      setIsLogged(true);
      Alert.alert("Success", "Login successful!");
      navigation.navigate('First Visit Form');
    } catch (error) {
      Alert.alert("Błąd logowania", error.message || "Wystąpił błąd podczas logowania.")
      setIsLogged(false);
    }
  };

  return (
    <NoStatusBarView>
      <StatusBar hidden></StatusBar>
      <View style={formStyles.topSection}></View>
      <View style={formStyles.middleSection}>
  
        <Text style={formStyles.h1}>Aby przejść dalej, zaloguj się{"\n"}na konto</Text>
        <View style={loginStyles.formContainer}>
          
          <Controller
            control={control}
            name="email"
            rules={{
              required: "E-mail jest wymagany",
              pattern: {
                value: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9.-]+$/,
                message: "Niepoprawny format adresu e-mail"
              }
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder="E-mail"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: "Hasło jest wymagane" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder="Hasło"
                secureTextEntry={true}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </View>

        <CustomButton 
          color={green} 
          textColor={white}
          action={() => {
            handleSubmit(onSubmit)();
          }}
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