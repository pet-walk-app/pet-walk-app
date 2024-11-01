import { useState } from 'react';
import { Pressable, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { formStyles } from "../styles.js/formStyles";
import CustomButton from "../components/CustomButton";
import { green, white } from "../consts/colors";

export default function PetForm2() {
  const img = require("../assets/default_dog_picture.png")
  const [hasPhoto, setHasPhoto] = useState(false);
  const [image, setImage] = useState("null");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setHasPhoto(true)
    }
  };
  return (
  <View style={formStyles.container}>
    <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
      <Text style={formStyles.h1}>Dodaj zdjęcie swojego zwierzaka.</Text>
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