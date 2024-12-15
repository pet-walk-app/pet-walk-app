import React from 'react';

import { useNavigation  } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import { caregiverFoundStyles } from '../styles/componentsStyles';
import { acceptSomeoneToOffer } from "../services/offersApi";

const CaregiverFound = ({caregiverName, phone, img, caregiverId, offerId }) => {
  const navigation = useNavigation();
  const ownerDefaultPhoto = require("../assets/grazynka.png");

  const handleAccept = () => {
    console.log("Accept button clicked");
    //acceptSomeoneToOffer();
  };
  
  const handleDecline = () => {
    console.log("Decline button clicked");
    
  };

  return (
    <View style={caregiverFoundStyles.container}>
      <View style={caregiverFoundStyles.leftSection}>
        <View style={caregiverFoundStyles.profileImageContainer}>
          <Image 
          source={img ? { uri: img } : ownerDefaultPhoto} 
          style={caregiverFoundStyles.profileImage} 
          />
        </View>
        <Pressable 
          style={caregiverFoundStyles.button}
          onPress={() => navigation.navigate('User Profile')}>
          <Text style={caregiverFoundStyles.buttonText}>Profil</Text>
        </Pressable>
      </View>

      <View style={caregiverFoundStyles.middleSection}>
        <Text 
          style={caregiverFoundStyles.name}>{caregiverName}
        </Text>
        <Text 
          style={caregiverFoundStyles.price}>
          Telefon: {phone}
        </Text>
        <View style={caregiverFoundStyles.buttonsContainer}>
          <Pressable 
            onPress={() => handleDecline()}
            style={caregiverFoundStyles.iconContainer}
          >
            <Image source={require('../assets/icons/decline.png')} style={caregiverFoundStyles.image} />
          </Pressable>
          <Pressable 
            onPress={() => handleAccept()}
            style={caregiverFoundStyles.iconContainer}
          >
            <Image source={require('../assets/icons/accept.png')} style={caregiverFoundStyles.image} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CaregiverFound;