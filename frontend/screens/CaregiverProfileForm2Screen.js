import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { Pressable, Image, View, Text, Alert } from 'react-native';
import { getProfile } from "../services/userApi";
import { saveCaregiverPhoto } from "../services/caregiverApi";

import * as ImagePicker from 'expo-image-picker';
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";

export default function CaregiverProfileForm2({route, navigation}) {
  const img = require("../assets/plus.png");
  const trashIcon = require("../assets/icons/trash.png");
  const [formTitle, setFormTitle] = useState('');
  const [images, setImages] = useState([null, null, null, null]);
  const [editingProfile, setEditProfile] = useState(route.params.edit ?? false);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const profile = await getProfile();
          console.log(profile)
          if (profile.caregiver == null) {
            setImages([null, null, null, null]);
            return;
          }
  
          if (profile.caregiver.images) {
            const imagesFromProfile = profile.caregiver.images.map(image => image.url || null);
  
            while (imagesFromProfile.length < 4) {
              imagesFromProfile.push(null);
            }
  
            setImages(imagesFromProfile);
          } 

          if (profile.caregiver.images.length === 0)
          {
            setFormTitle("Dodaj zdjęcia swojego profilu");
          }
          else
          {
            setFormTitle("Edytuj zdjęcia swojego profilu");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setImages([null, null, null, null]); // Domyślnie ustaw na 4 x null w razie błędu
        }
      };
  
      fetchProfile();
    }, [])
  );
  

  const onSubmit = async () => {
    try {
      await saveCaregiverPhoto(images);
      if (editingProfile) {
        navigation.goBack();
        navigation.goBack();
      } else {
        navigation.navigate('Offers List');
      }
    } catch (error) {
      Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.");
    }
  };

  const pickImage = async (index) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedImages = [...images];
      updatedImages[index] = result.assets[0].uri;
      setImages(updatedImages);
    }
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  return (
    <NoStatusBarView>
      <View style={[formStyles.middleSection, { justifyContent: "none" }]}>
        <Text style={formStyles.h1}>{formTitle}</Text>
        <View style={[formStyles.formContainer]}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {images.map((image, index) => (
              <View key={index} style={{ position: 'relative' }}>
                <Pressable onPress={() => pickImage(index)}>
                  {image ? (
                    <Image source={{ uri: image }} style={[formStyles.imageSmall]} />
                  ) : (
                    <Image source={img} style={[formStyles.imageSmall]} />
                  )}
                </Pressable>
                {image && (
                  <Pressable 
                    onPress={() => deleteImage(index)} 
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      zIndex: 10,
                    }}
                  >
                    <Image source={trashIcon} style={{ width: 30, height: 30 }} />
                  </Pressable>
                )}
              </View>
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
