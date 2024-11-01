import React, { useState } from 'react';
import { Pressable, Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { formStyles } from "../styles.js/formStyles";
import CustomButton from "../components/CustomButton";
import { green, white } from "../consts/colors";

export default function CaregiverProfileForm2() {
  const img = require("../assets/grazynka.png");
  const [images, setImages] = useState([null, null, null, null]);
  const [hasPhoto, setHasPhoto] = useState([false, false, false, false]);

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedImages = [...images];
      updatedImages[index] = result.assets[0].uri;
      setImages(updatedImages);

      const updatedHasPhoto = [...hasPhoto];
      updatedHasPhoto[index] = true;
      setHasPhoto(updatedHasPhoto);
    }
  };

  return (
    <View style={formStyles.container}>
      <View style={[formStyles.middleSection, { justifyContent: "none" }]}>
        <Text style={formStyles.h1}>Dodaj zdjęcia dla swojego profilu.</Text>
        <View style={[formStyles.formContainer, {  }]}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {images.map((image, index) => (
              <Pressable key={index} onPress={() => pickImage(index)}>
              {image ? <Image key={index} source={{ uri: image }} style={[formStyles.imageSmall]} /> : 
              (<Image source={img} style={[formStyles.imageSmall]}/>)}
              </Pressable>
            ))}
          </View>

          <CustomButton 
            color={green} 
            textColor={white}
            action={""}
            title={"Kontynuuj"} 
          />
        </View>
      </View>
    </View>
  );
}
