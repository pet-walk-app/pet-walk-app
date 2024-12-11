import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Pressable, Image, View, Text } from 'react-native';
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { savePetPhoto } from "../services/petApi";
import { getProfile } from "../services/userApi";

import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";
import * as ImagePicker from 'expo-image-picker';

export default function PetForm2() {
  // True if user uses this form for the first time and creating an account
  // False if user already has an account and is editing it
  const [editingProfile, setEditProfile] = useState(false);

  const img = require("../assets/default_dog_picture.png");
  const trashIcon = require("../assets/icons/trash.png");
  const [formTitle, setFormTitle] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [image, setImage] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const profile = await getProfile();
          if (profile.caregiver != null) {
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

  const onSubmit = async (data) => {
    try {
      console.log("onSubmit");
      //await savePetPhoto(data);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  useEffect(() => {
    if (editingProfile) {
      setFormTitle("Edytuj zdjęcie swojego zwierzaka");
    } else {
      setFormTitle("Dodaj zdjęcie swojego zwierzaka");
    }
  }, [editingProfile]);

  return (
    <NoStatusBarView>
      <View style={[formStyles.middleSection, { justifyContent: "none" }]}>
        <Text style={formStyles.h1}>{formTitle}</Text>

        <View style={[formStyles.formContainer, { justifyContent: 'center', alignItems: 'center' }]}>
          <View style={{ position: 'relative' }}>
            <Pressable onPress={pickImage}>
              {hasPhoto ? (
                <Image source={{ uri: image }} style={[formStyles.image]} />
              ) : (
                <Image source={img} style={[formStyles.image]} />
              )}
            </Pressable>

            {hasPhoto && (
              <Pressable
                onPress={deleteImage}
                style={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  zIndex: 10,
                }}
              >
                <Image source={trashIcon} style={{ width: 50, height: 50 }} />
              </Pressable>
            )}
          </View>

          <CustomButton
            color={green}
            textColor={white}
            action={pickImage}
            title={"Dodaj zdjęcie"}
          />
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
