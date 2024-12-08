import { Pressable, Text, View, Image, ScrollView } from "react-native";
import { profileStyles } from "../styles/profileStyles";
import NoStatusBarView from "../components/NoStatusBarView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { green, white, darkGrey } from "../consts/colors";
import { logoutUser } from "../services/authorizationApi";

export default function UserProfile({navigation}) {

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          setPhone(parsedUser.phone || "Brak danych");
          setEmail(parsedUser.email || "Brak danych");
          setDateOfBirth(parsedUser.dateOfBirth || "Brak danych");
        } else {
          console.warn("Brak danych użytkownika w AsyncStorage");
        }
      } catch (error) {
        console.error("Błąd podczas ładowania danych użytkownika z AsyncStorage", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.replace("Login Screen");
    } catch (error) {
      console.error("Błąd podczas próby wylogowania:", error);
    }
  };

  return (
    <NoStatusBarView padding={40} extraStyle={profileStyles.container}>

      <View style={profileStyles.mainHeader}>
          <Text style={profileStyles.h1}>Anna Kowalska</Text>
          <Pressable style={profileStyles.button}
            onPress={() => {navigation.navigate('Edit User')}}>
            <Text style={profileStyles.buttonText}>Edytuj</Text>
          </Pressable>
      </View>

      
      <View style={profileStyles.infoSection}>
        <View style={profileStyles.profileImageContainer}>
          <Image source={require('../assets/grazynka.png')} style={profileStyles.profileImage}/>
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

    <ScrollView style={profileStyles.scrollView}>

      <View style={profileStyles.headerSection}>
        <Text style={profileStyles.h1}>Twoje Zwierzęta</Text>
        <Text>Kliknij ikonę zwierzęcia, aby przejść do edycji</Text>
      </View>

      <View
        style={profileStyles.yourPetsSection}>
          <ScrollView style={profileStyles.petCarousel} horizontal={true}>
            {[...Array(5)].map((_, index) => (
              <View key={index} style={profileStyles.petImageContainer}>
                <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage} />
                <Pressable 
                  style={profileStyles.plusIconContainer}>
                  <Image 
                    source={require('../assets/icons/edit.png')}
                    style={profileStyles.plusIcon}
                  />
                </Pressable>
              </View>
            ))}
          </ScrollView>

        <Pressable style={profileStyles.button}>
          <Text style={profileStyles.buttonText}>Dodaj</Text>
        </Pressable>
      </View>


      <View style={profileStyles.headerSection}>
        <Text style={profileStyles.h1}>Profil Opiekuna</Text>
      </View>

      <View style={profileStyles.caregiverSection}>
        <Text style={profileStyles.h3}>Nie masz jeszcze stworzonego profilu opiekuna.</Text>
        <Pressable style={profileStyles.button}>
          <Text style={profileStyles.buttonText}>Utwórz</Text>
        </Pressable>
        <Text 
          style={profileStyles.caregiverDescription}>
          Ext ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        
        <Text
          style={profileStyles.h2}>
          Zdjęcia opiekuna
        </Text>
        <ScrollView 
          style={profileStyles.petCarousel}
          horizontal={true}>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
        </ScrollView>
        <Pressable 
          style={profileStyles.button}
          onPress={() => navigation.navigate('Caregiver Profile Form 2')}>
          <Text style={profileStyles.buttonText}>Zdjęcia</Text>
        </Pressable>
      </View>

      </ScrollView>

      <CustomButton
          color={green} 
          textColor={white}
          action={handleLogout}
          title={'Wyloguj'}>
      </CustomButton>
    </NoStatusBarView>
  );
}