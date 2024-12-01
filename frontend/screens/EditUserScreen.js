import React, { useEffect } from "react";
import { View, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { editUser } from "../services/userApi";
import { green, white } from "../consts/colors";
import { formStyles } from "../styles/formStyles";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import DatePicker from "../components/DatePicker";
import NoStatusBarView from "../components/NoStatusBarView";

export default function EditUserScreen({ navigation }) {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      dateOfBirth: new Date(1990, 1, 1),
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          setValue("name", parsedUser.name || "");
          setValue("phone", parsedUser.phone || "");
          setValue("dateOfBirth", parsedUser.dateOfBirth ? new Date(parsedUser.dateOfBirth) : new Date(1990, 1, 1));
        } else {
          console.warn("Brak danych użytkownika w AsyncStorage.");
        }
      } catch (error) {
        console.error("Błąd podczas odczytu danych z AsyncStorage:", error.message);
      }
    };

    loadUserData();
  }, [setValue]);

  const onSubmit = async (data) => {
    if (data.newPassword || data.confirmNewPassword) {
      if (data.newPassword !== data.confirmNewPassword) {
        Alert.alert("Błąd", "Nowe hasła muszą się zgadzać.");
        return;
      }
    }

    try {
      await editUser(
        data.name,
        data.dateOfBirth,
        data.phone,
        data.newPassword
      );
      Alert.alert("Sukces", "Dane użytkownika zostały zaktualizowane.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Błąd aktualizacji", error.message || "Wystąpił błąd podczas aktualizacji danych użytkownika.");
    }
  };

  return (
    <NoStatusBarView>
      <View style={formStyles.middleSection}>
        <Text style={formStyles.h1}>Edytuj swój profil użytkownika</Text>
        <View style={formStyles.formContainer}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Imię jest wymagane",
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/,
                message: "Imię może zawierać cyfry, litery, -, _",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder={"Imię użytkownika"}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Numer telefonu jest wymagany",
              pattern: {
                value: /^\d{9}$/,
                message: "Numer musi składać się z 9 cyfr",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder={"Numer telefonu"}
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: "Data urodzenia jest wymagana" }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                date={value}
                setDate={onChange}
                dateMin={new Date(1990, 1, 1)}
                errorMessage={errors.dateOfBirth?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            rules={{
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
                placeholder={"Nowe hasło"}
                secureTextEntry={true}
                errorMessage={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmNewPassword"
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder={"Potwierdź nowe hasło"}
                secureTextEntry={true}
                errorMessage={errors.confirmNewPassword?.message}
              />
            )}
          />
        </View>

        <CustomButton
          color={green}
          textColor={white}
          action={handleSubmit(onSubmit)}
          title={"Zapisz zmiany"}
        />
        <CustomButton
          color={white}
          textColor={green}
          action={() => navigation.goBack()}
          title={"Anuluj"}
        />
      </View>
      <View style={formStyles.bottomSection}></View>
    </NoStatusBarView>
  );
}
