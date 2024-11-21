import { useState } from "react";
import { View, Text, StatusBar, Alert } from "react-native";
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { useForm, Controller } from "react-hook-form";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";

import { registerUser } from "../services/authorizationApi";

export default function RegistrationScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      Alert.alert("Sukces", "Zarejestrowano pomyślnie! Teraz możesz się zalogować.");
      navigation.navigate('Login Screen');
    } catch (error) {
      Alert.alert("Błąd rejestracji", error.message || "Wystąpił błąd podczas rejestracji.")
    }
  };

  return (
    <NoStatusBarView>
      <StatusBar hidden></StatusBar>
      <View style={formStyles.middleSection}>
        <Text style={formStyles.h1}>Załóż konto</Text>
        <View style={formStyles.formContainer}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "E-mail jest wymagany",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/,
                message: "Niepoprawny format adresu e-mail",
              },
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
            rules={{
              required: "Hasło jest wymagane",
              minLength: {
                value: 5,
                message: "Hasło musi mieć co najmniej 5 znaków",
              },
              maxLength: {
                value: 64,
                message: "Hasło może mieć maksymalnie 64 znaki",
              },
            }}
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
          action={() => handleSubmit(onSubmit)()}
          title="Kontynuuj"
        />
        <CustomButton
          color={white}
          textColor={green}
          action={() => navigation.navigate('Login Screen')}
          title="Zaloguj się"
        />
      </View>
      <View style={formStyles.bottomSection}></View>
    </NoStatusBarView>
  );
}
