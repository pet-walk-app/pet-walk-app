import React, { useEffect, useState } from "react";
import {View, Text, Alert, Pressable, Image, ScrollView} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";
import { fetchUserData, editUser, saveUserPhoto, deleteUserPhoto } from "../services/userApi";
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

  const trashIcon = require("../assets/icons/trash.png");
  const [image, setImage] = useState(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await fetchUserData();
        if (user) {
          setValue("name", user.name || "");
          setValue("phone", user.phone || "");
          setValue("dateOfBirth", user.dateOfBirth ? new Date(user.dateOfBirth) : new Date(1990, 1, 1));
          setImage(user.imageUrl || null);
          setHasPhoto(!!user.imageUrl);
        } else {
          console.warn("Brak danych użytkownika.");
        }
      } catch (error) {
        console.error("Błąd podczas pobierania danych użytkownika:", error.message);
      }
    };

    loadUserData();
  }, [setValue]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setHasPhoto(true);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const deleteImage = async () => {
    try {
      await deleteUserPhoto();
      setImage(null);
      setHasPhoto(false);
      Alert.alert("Sukces", "Zdjęcie zostało usunięte.");
    } catch (error) {
      console.error("Błąd podczas usuwania zdjęcia:", error.message);
      Alert.alert("Błąd", "Nie udało się usunąć zdjęcia.");
    }
  };

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

      if (hasPhoto && image) {
        await saveUserPhoto(image);
      }

      Alert.alert("Sukces", "Dane użytkownika zostały zaktualizowane.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Błąd aktualizacji", error.message || "Wystąpił błąd podczas aktualizacji danych użytkownika.");
    }
  };

  return (
    <NoStatusBarView>
      <ScrollView>
        <View style={formStyles.middleSection}>
          <Text style={formStyles.h1}>Edytuj swój profil użytkownika</Text>
          <View style={formStyles.profileImageContainer}>
            <Pressable onPress={pickImage}>
              {hasPhoto ? (
                  <Image
                      source={{ uri: image }}
                      style={[formStyles.image, { width: 100, height: 100 }]}
                  />
              ) : (
                  <Image
                      source={require("../assets/plus.png")}
                      style={[formStyles.image, { width: 100, height: 100 }]}
                  />
              )}
            </Pressable>
            {hasPhoto && (
              <Pressable
                onPress={deleteImage}
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -15,
                  zIndex: 10,
                }}
              >
                <Image source={trashIcon} style={{ width: 35, height: 35 }} />
              </Pressable>
            )}
          </View>

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
                        label={'Data urodzenia'}
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
      </ScrollView>
    </NoStatusBarView>
  );
}
