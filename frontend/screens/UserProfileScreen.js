import { Pressable, Text, View, Image, ScrollView } from "react-native";
import { profileStyles } from "../styles/profileStyles";
import NoStatusBarView from "../components/NoStatusBarView";
import { fetchUserData } from "../services/userApi.js";
import { useState, useEffect, use } from "react";
import CustomButton from "../components/CustomButton";
import { green, white } from "../consts/colors";
import { logoutUser } from "../services/authorizationApi";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import BottomMenu from "../components/BottomMenu.js";


export default function UserProfile({ navigation }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [caregiverDescr, setCaregiverDescr] = useState("");
  const [caregiverImages, setCaregiverImages] = useState([]);
  const [pets, setPets] = useState([]);
  const [imageUrl, setImageUrl] = useState("")

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const user = await fetchUserData();
          if (user) {
            setPhone(user.phone || "Brak danych");
            setEmail(user.email || "Brak danych");
            setUsername(user.name || "Brak danych");
            setDateOfBirth(user.dateOfBirth || "Brak danych");
            setImageUrl(user.imageUrl)
  
            if (user.caregiver != null) {
              setCaregiverDescr(user.caregiver.description || "Brak danych");
            }
  
            if (user.caregiver?.images) {
              const imagesFromProfile = user.caregiver.images.map(
                (image) => image.url || null
              );
  
              setCaregiverImages(imagesFromProfile);
            }
  
            if (user.petOwner?.pets) {
              setPets(user.petOwner.pets);
            }
          } else {
            console.warn("Błąd podczas pobierania danych użytkownika");
          }
        } catch (error) {
          console.error("Błąd podczas ładowania danych użytkownika:", error);
        }
      };
  
      fetchData();
  
      return () => {
        setPhone("");
        setEmail("");
        setUsername("");
        setDateOfBirth("");
        setCaregiverDescr("");
        setCaregiverImages([]);
        setPets([]);
      };
    }, [])
  );
  

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.replace("Login Screen");
    } catch (error) {
      console.error("Błąd podczas próby wylogowania:", error);
    }
  };

  const addPet = () => {
    navigation.navigate("Pet Form");
  };

  const editPet = (petId) => {
    navigation.navigate("Pet Form", {petId: petId});
  }

  return (
    
    <NoStatusBarView extraStyle={profileStyles.container}>
      <ScrollView style={{flexGrow: 1}}>
        <View style={{ padding: 40, flex: 1 }}>
          <View style={profileStyles.mainHeader}>
            <Text style={profileStyles.h1}>{username}</Text>
            <Pressable
                style={profileStyles.button}
                onPress={() => {
                  navigation.navigate("Edit User");
                }}
            >
              <Text style={profileStyles.buttonText}>Edytuj</Text>
            </Pressable>
          </View>

          <View style={profileStyles.infoSection}>
            <View style={profileStyles.profileImageContainer}>
              <Image
                  source={imageUrl ? { uri: imageUrl } : require("../assets/grazynka.png")}
                  style={profileStyles.profileImage}
              />
            </View>

            <View style={profileStyles.textContainer}>
              <Text style={[profileStyles.text]}>Numer telefonu:</Text>
              <Text style={[profileStyles.text, profileStyles.boldText]}>{phone}</Text>
              <Text style={[profileStyles.text]}>Adres e-mail:</Text>
              <Text style={[profileStyles.text, profileStyles.boldText]}>{email}</Text>
              <Text style={[profileStyles.text]}>Data urodzenia:</Text>
              <Text style={[profileStyles.text, profileStyles.boldText]}>{dateOfBirth}</Text>
            </View>
          </View>

          <View style={profileStyles.scrollView}>
            <View style={profileStyles.headerSection}>
              <Text style={profileStyles.h1}>Twoje Zwierzęta</Text>
              <Text>Kliknij ikonę zwierzęcia, aby przejść do edycji</Text>
            </View>

            <View style={profileStyles.yourPetsSection}>
              <ScrollView style={profileStyles.petCarousel} horizontal={true}>
                <View style={profileStyles.petCarouselWrapper}>
                  {pets.map((pet) => (
                      <View key={pet.id} style={profileStyles.petImageContainer}>
                        <Image
                            source={pet.imageUrl ? { uri: pet.imageUrl } : require('../assets/create-profile-button/dog.png')}
                            style={profileStyles.petImage}
                        />
                        <Pressable
                            onPress={() => editPet(pet.id)}
                            style={profileStyles.plusIconContainer}
                        >
                          <Image
                              source={require("../assets/icons/edit.png")}
                              style={profileStyles.plusIcon}
                          />
                        </Pressable>
                      </View>
                  ))}
                  <View style={profileStyles.petImageContainer}>
                    <Pressable onPress={addPet} style={profileStyles.petImageContainer}>
                      <Image
                          source={require("../assets/plus.png")}
                          style={profileStyles.petImage}
                      />
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
            </View>

            <View style={profileStyles.headerSection}>
              <Text style={profileStyles.h1}>Profil Opiekuna</Text>
            </View>

            <View style={profileStyles.caregiverSection}>
              {caregiverDescr === "" && (
                  <>
                    <Text style={profileStyles.h3}>
                      Nie masz jeszcze stworzonego profilu opiekuna.
                    </Text>
                    <Pressable
                        style={profileStyles.button}
                        onPress={() => navigation.navigate("Caregiver Profile Form")}
                    >
                      <Text style={profileStyles.buttonText}>Utwórz</Text>
                    </Pressable>
                  </>
              )}

              <Text style={profileStyles.caregiverDescription}>{caregiverDescr}</Text>


              {caregiverImages.length > 0 && (
                  <>
                    <Text style={profileStyles.h2}>Zdjęcia opiekuna</Text>

                    <ScrollView style={profileStyles.petCarousel} horizontal={true}>
                      <View style={profileStyles.petCarouselWrapper}>
                        {caregiverImages.map((image, index) => (
                            <View key={index} style={profileStyles.petImageContainer}>
                              <Image
                                  source={{ uri: image }}
                                  style={profileStyles.petImage}
                              />
                            </View>
                        ))}
                      </View>
                    </ScrollView>
                  </>
              )}

              {(caregiverImages.length > 0 || caregiverDescr.length > 0) && (
                  <Pressable
                      style={profileStyles.button}
                      onPress={() => navigation.navigate("Caregiver Profile Form", {
                        edit: true
                      })}
                  >
                    <Text style={profileStyles.buttonText}>Edytuj</Text>
                  </Pressable>
              )}
            </View>
          </View>

          <CustomButton
              color={green}
              textColor={white}
              action={handleLogout}
              title={"Wyloguj"}
          ></CustomButton>
        </View>
      </ScrollView>
      <BottomMenu navigation={navigation}/>
    </NoStatusBarView>
  );
}
