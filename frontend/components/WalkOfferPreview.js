import React from 'react';
import { View, Text, Image } from 'react-native';
import { walkOfferPreviewStyles } from '../styles/offerListStyles';

const WalkOfferPreview = ({ animalName, breed, distance, date, length, price, imageUrl = '' }) => {
  return (
    <View style={walkOfferPreviewStyles.container}>
      <View style={walkOfferPreviewStyles.leftSection}>
        <View style={walkOfferPreviewStyles.profileImageContainer}>
          <Image
            source={
              imageUrl
                ? { uri: imageUrl }
                : require('../assets/grazynka.png')
            }
            style={walkOfferPreviewStyles.profileImage}
          />
        </View>
      </View>
      <View style={walkOfferPreviewStyles.middleSection}>
        <Text style={walkOfferPreviewStyles.animalName}>{animalName}</Text>
        <Text style={walkOfferPreviewStyles.breed}>Rasa: {breed}</Text>
        <Text style={walkOfferPreviewStyles.distance}>Odległość: {distance} km</Text>
        <Text style={walkOfferPreviewStyles.date}>Data spaceru: {date}</Text>
        <Text style={walkOfferPreviewStyles.length}>Długość spaceru: {length}</Text>
        <Text style={walkOfferPreviewStyles.price}>Zapłata: {price} zł</Text>
      </View>
    </View>
  );
};

export default WalkOfferPreview;
