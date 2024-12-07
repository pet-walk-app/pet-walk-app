import { useState, useEffect } from 'react';
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { Pressable, Image, View, Text } from 'react-native';
import { saveCaregiverPhoto } from "../services/authorizationApi";

import * as ImagePicker from 'expo-image-picker';
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";


export default function CaregiverProfileForm2({navigation}) {
  // True if user uses this form for the first time and creating an account
  // False if user already has an account and is editing it
  const [editingProfile, setEditProfile] = useState(false)

  const img = require("../assets/plus.png");
  const [formTitle, setFormTitle] = useState('')
  const [images, setImages] = useState([null, null, null, null]);
  const [hasPhoto, setHasPhoto] = useState([false, false, false, false]);

  const onSubmit = async () => {
    try {
      await saveCaregiverPhoto(images)
      navigation.navigate('First Visit Profile Choice');
    } catch (error) {
      Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.")
    }
  };


  useEffect(() => {
    if (editingProfile) {
      setFormTitle("Edytuj zdjęcia swojego profilu");
    } else {
      setFormTitle("Dodaj zdjęcia swojego profilu");
    }
  }, [editingProfile]);


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
    <NoStatusBarView>
      <View style={[formStyles.middleSection, { justifyContent: "none" }]}>
        <Text style={formStyles.h1}>{formTitle}</Text>
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
            action={onSubmit}
            title={"Kontynuuj"} 
          />
        </View>
      </View>
    </NoStatusBarView>
  );
}
