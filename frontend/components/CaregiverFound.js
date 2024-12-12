import React from 'react';

import { useNavigation  } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import { caregiverFoundStyles } from '../styles/componentsStyles';

const CaregiverFound = ({caregiverName, price }) => {
  const navigation = useNavigation();
  return (
    <View style={caregiverFoundStyles.container}>
      <View style={caregiverFoundStyles.leftSection}>
        <View style={caregiverFoundStyles.profileImageContainer}>
          <Image source={require('../assets/grazynka.png')} style={caregiverFoundStyles.profileImage} />
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
          Zapłata: {price} zł/h
        </Text>
        <View style={caregiverFoundStyles.buttonsContainer}>
          <Pressable style={caregiverFoundStyles.iconContainer}>
            <Image source={require('../assets/icons/accept.png')} style={caregiverFoundStyles.image} />
          </Pressable>
          <Pressable style={caregiverFoundStyles.iconContainer}>
            <Image source={require('../assets/icons/decline.png')} style={caregiverFoundStyles.image} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default CaregiverFound;