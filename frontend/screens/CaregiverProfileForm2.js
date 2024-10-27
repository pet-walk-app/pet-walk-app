import { useState } from 'react';
import { Pressable, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { formStyles } from "../styles.js/formStyles";
import CustomButton from "../components/CustomButton";
import { green, white } from "../consts/colors";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
  <View style={formStyles.container}>
    <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
      <Text style={formStyles.h1}>Dodaj zdjęcie swojego {"\n"}profilu.</Text>
      <View style={[formStyles.formContainer, {justifyContent: 'center', alignItems: 'center'}]}>
          
        {image && <Image source={{ uri: image }} style={[formStyles.image]} />}
        <Pressable onPress={pickImage} style={[formStyles.button, {backgroundColor: green}]}>
            <View>
              <Text style={[formStyles.buttonText, {color: white} ]}>Wybierz zdjęcie</Text>
            </View>
        </Pressable>
      
        <CustomButton 
          color={green} 
          textColor={white}
          action={""}
          title={"Pomiń"}>
      </CustomButton>


      </View>
    </View>
  </View>
  );
}