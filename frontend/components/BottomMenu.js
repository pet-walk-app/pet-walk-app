import React from 'react';
import { View, Text, Image, Pressable, Alert } from 'react-native';
import { bottomMenuStyles } from '../styles/componentsStyles';
import { fetchUserData } from '../services/userApi';

const BottomMenu = ({ navigation }) => {
  const checkIfUserHasPets = async () => {
    try {
      const user = await fetchUserData();

      if (user.petOwner?.pets && user.petOwner.pets.length > 0) {
        navigation.navigate('Add Offer');
      } else {
        Alert.alert(
          "Nie możesz tego zrobić",
          "Aby dodać ofertę, stwórz najpierw profil zwierzęcia.",
          [
            {
              text: "Później",
            },
            {
              text: "Stwórz",
              onPress: () => navigation.navigate('Pet Form'),
            },
          ],
          { cancelable: true }
        );
      }
    } catch (error) {
      console.error("Błąd podczas pobierania danych użytkownika:", error.message);
    }
  };

  return (
    <View style={bottomMenuStyles.container}>
      <Pressable 
        style={bottomMenuStyles.iconContainer}
        onPress={() => navigation.navigate('User Profile')}>
        <Image source={require('../assets/icons/user.png')} style={bottomMenuStyles.icon} />
        <Text>Profil</Text>
      </Pressable>
      <Pressable 
        style={bottomMenuStyles.iconContainer}
        onPress={checkIfUserHasPets}
      >
        <Image source={require('../assets/icons/add.png')} style={bottomMenuStyles.icon} />
        <Text>Dodaj ofertę</Text>
      </Pressable>
      <Pressable 
        style={bottomMenuStyles.iconContainer}
        onPress={() => navigation.navigate('My Offers')}>
        <Image source={require('../assets/icons/offers.png')} style={bottomMenuStyles.icon} />
        <Text>Moje oferty</Text>
      </Pressable>
    </View>
  );
};

export default BottomMenu;
