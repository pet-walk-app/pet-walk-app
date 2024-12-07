import { useState, useEffect } from 'react';
import { Pressable, Image, View, Text } from 'react-native';
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";

import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";
import * as ImagePicker from 'expo-image-picker';


export default function PetForm2() {
  // True if user uses this form for the first time and creating an account
  // False if user already has an account and is editing it
  const [editingProfile, setEditProfile] = useState(false)

  const img = require("../assets/default_dog_picture.png")
  const [formTitle, setFormTitle] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false);
  const [image, setImage] = useState("null");

  const onSubmit = async (data) => {
    try {
      console.log("onSubmit")
      await savePetPhoto(data)
      //Alert.alert("Success", "Created profile!");
      //navigation.navigate('Pet Form 2');
    } catch (error) {
      //Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.")
    }
  };

  const pickImage = async () => {
    try {
      console.log("pickImage1");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      console.log("pickImage2", result);
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setHasPhoto(true);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  useEffect(() => {
    if (editingProfile) {
      setFormTitle("Edytuj zdjęcie swojego zwierzaka");
    } else {
      setFormTitle("Dodaj zdjęcie swojego zwierzaka");
    }
  }, [editingProfile]);


  return (
  <NoStatusBarView>
    <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
      <Text style={formStyles.h1}>{formTitle}</Text>

      <View style={[formStyles.formContainer, {justifyContent: 'center', alignItems: 'center'}]}>
        <Pressable onPress={pickImage}>
          {hasPhoto ?
            (image && <Image source={{ uri: image }} style={[formStyles.image]} />) :
            (<Image source={img} style={[formStyles.image]}/>)
          }
        </Pressable>
        <CustomButton 
          color={green} 
          textColor={white}
          action={pickImage}
          title={"Dodaj zdjęcie"}>
        </CustomButton>
        <CustomButton 
          color={green} 
          textColor={white}
          action={onSubmit}
          title={"Kontynuuj"}>
        </CustomButton>
      </View>
    </View>
  </NoStatusBarView>
  );
}