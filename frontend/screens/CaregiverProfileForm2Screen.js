import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { Pressable, Image, View, Text, Alert } from 'react-native';
import { saveCaregiverPhoto, getProfile } from "../services/authorizationApi";

import * as ImagePicker from 'expo-image-picker';
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";

export default function CaregiverProfileForm2({navigation}) {
  // True if user uses this form for the first time and creating an account
  // False if user already has an account and is editing it
  const [editingProfile, setEditProfile] = useState(false);

  const img = require("../assets/plus.png");
  const trashIcon = require("../assets/icons/trash.png");
  const [formTitle, setFormTitle] = useState('');
  const [images, setImages] = useState([null, null, null, null]);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const profile = await getProfile();
          if (profile.caregiver != null && profile.caregiver.images) {
            const imagesFromProfile = profile.caregiver.images.slice(0, 4).map(image => image.url); // Uzyskujemy tylko URL
            setImages(imagesFromProfile);
              setEditProfile(true);
          } else {
            setEditProfile(false);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
  
      fetchProfile();
    }, [])
  );

  const onSubmit = async () => {
    try {
      await saveCaregiverPhoto(images);
      navigation.navigate('First Visit Profile Choice');
    } catch (error) {
      Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.");
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
