import { useState, useEffect } from 'react';
import { Pressable, Image, View, Text } from 'react-native';
import { formStyles } from "../styles.js/formStyles";
import { green, white } from "../consts/colors";

import CustomButton from "../components/CustomButton";
import * as ImagePicker from 'expo-image-picker';


export default function PetForm2() {
  // True if user uses this form for the first time and creating an account
  // False if user already has an account and is editing it
  const [editingProfile, setEditProfile] = useState(false)

  const img = require("../assets/default_dog_picture.png")
  const [formTitle, setFormTitle] = useState('')
  const [hasPhoto, setHasPhoto] = useState(false);
  const [image, setImage] = useState("null");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setHasPhoto(true)
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
  <View style={formStyles.container}>
    <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
      <Text style={formStyles.h1}>{formTitle}</Text>

      <View style={[formStyles.formContainer, {justifyContent: 'center', alignItems: 'center'}]}>
        <Pressable onPress={pickImage}>
          {hasPhoto ?
          (image && <Image source={{ uri: image }} style={[formStyles.image]} />) :
          (<Image source={img} style={[formStyles.image]}/>)}
        </Pressable>
        <CustomButton 
          color={green} 
          textColor={white}
          action={""}
          title={"Kontynuuj"}>
        </CustomButton>
      </View>
    </View>
  </View>
  );
}