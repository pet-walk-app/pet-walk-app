import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { bottomMenuStyles } from '../styles/componentsStyles';

const BottomMenu = ({navigation}) => {
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
              onPress={() => navigation.navigate('Add Offer')}>
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