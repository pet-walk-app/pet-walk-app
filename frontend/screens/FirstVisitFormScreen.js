import { useState, useEffect } from "react";
import { Pressable, Image, View, Text, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from "react-hook-form";
import { createProfile, uploadUserPhoto } from "../services/userApi";
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { saveUserPhoto } from "../services/userApi";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import DatePicker from "../components/DatePicker";
import NoStatusBarView from "../components/NoStatusBarView";

export default function FirstVisitFormScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      dateOfBirth: new Date(1990, 1, 1),
    },
  });

  const [image, setImage] = useState(null);
  const [hasPhoto, setHasPhoto] = useState(false);

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

  const deleteImage = () => {
    setImage(null);
    setHasPhoto(false);
  };

  const onSubmit = async (data) => {
    try {
      await createProfile(data);
      if (image) {
        await saveUserPhoto(image);
      } else {
        await saveUserPhoto(null);
      }
      navigation.navigate("First Visit Profile Choice");
    } catch (error) {
      Alert.alert(
        "Błąd tworzenia profilu",
        error.message || "Wystąpił błąd podczas tworzenia profilu."
      );
    }
  };

  return (
    <NoStatusBarView>
      <View style={formStyles.middleSection}>
        <Text style={formStyles.h1}>
          To Twoja pierwsza wizyta w {"\n"}Pet Walk, uzupełnij swoje informacje
        </Text>

        <View style={formStyles.formContainer}>

          <Controller
            control={control}
            name="name"
            rules={{
              required: "Nazwa jest wymagana",
              minLength: {
                value: 5,
                message: "Nazwa musi mieć co najmniej 5 znaków",
              },
              pattern: {
                value: /^(?!.*\d).+$/,
                message: "Nazwa nie może zawierać cyfr",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder="Nazwa użytkownika"
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
                placeholder="Numer telefonu"
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: "Data jest wymagana" }}
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

          <Text style={formStyles.h3}>Kliknij plus aby dodać zdjęcie użytkownika. Będzie ono widoczne na twoim profilu.</Text>
          <View style={{ alignItems: "center", marginVertical: 20 }}>
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
              <Pressable onPress={deleteImage} style={{ marginTop: 10 }}>
                <Text style={{ color: "red" }}>Usuń zdjęcie</Text>
              </Pressable>
            )}
          </View>

          <CustomButton
            color={green}
            textColor={white}
            action={handleSubmit(onSubmit)}
            title="Kontynuuj"
          />
        </View>
      </View>
    </NoStatusBarView>
  );
}
