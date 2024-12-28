import { useState } from "react";
import { View, Text, StatusBar, Alert, ActivityIndicator } from "react-native";
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { useForm, Controller, watch } from "react-hook-form";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";

import { registerUser, loginUser } from "../services/authorizationApi";
import { fetchUserData, getProfile } from "../services/userApi";

export default function RegistrationScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data);
      Alert.alert("Sukces", "Zarejestrowano pomyślnie. Logowanie...");

      await loginUser({ email: data.email, password: data.password });
      
      await fetchUserData();
      const profile = await getProfile();

      if (profile.firstVisit) {
        navigation.replace("First Visit Form");
      } else {
        if (profile.caregiver || profile.petOwner) {
          navigation.replace("Offers List");
        } else {
          navigation.replace("First Visit Profile Choice");
        }
      }
      
    } catch (error) {
      Alert.alert("Błąd", error.message || "Coś poszło nie tak. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <NoStatusBarView>
      <StatusBar hidden />
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
              minLength: {
                value: 6,
                message: "E-mail musi mieć co najmniej 6 znaków",
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
            rules={{
              required: "Hasło jest wymagane",
              minLength: {
                value: 6,
                message: "Hasło musi mieć co najmniej 6 znaków",
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

        {loading ? (
          <ActivityIndicator size="large" color={green} />
        ) : (
          <>
            <CustomButton
              color={green}
              textColor={white}
              action={() => handleSubmit(onSubmit)()}
              title="Kontynuuj"
            />
            <CustomButton
              color={white}
              textColor={green}
              action={() => navigation.navigate("Login Screen")}
              title="Zaloguj się"
            />
          </>
        )}
      </View>
      <View style={formStyles.bottomSection}></View>
    </NoStatusBarView>
  );
}
