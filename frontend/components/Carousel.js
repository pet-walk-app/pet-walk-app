import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { carouselStyles } from '../styles/componentsStyles';

const DATA = [
  {
    id: '1',
    image: require('../assets/carousel/dog-on-leash.png'),
    text: 'Umów spacer dla swojego pupila w kilka minut',
  },
  {
    id: '2',
    image: require('../assets/carousel/girl-walking-the-dog.png'),
    text: 'Zarabiaj, wyprowadzając psy w swojej okolicy, kiedy tylko chcesz',
  },
  {
    id: '3',
    image: require('../assets/carousel/pet-owner.png'),
    text: 'Sprawdź dostępnych właścicieli i opiekunów w Twojej okolicy',
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleIndexChange = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % DATA.length);
    }, 3300);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={carouselStyles.container}>

      <View style={carouselStyles.leftContainer}>
         <View style={carouselStyles.textContainer}>
            <Text style={carouselStyles.text}>{DATA[currentIndex].text}</Text>
         </View> 

         <View style={carouselStyles.indicatorContainer}>
            {DATA.map((_, index) => (
            <TouchableOpacity key={index} onPress={() => handleIndexChange(index)}>
               <View
                  style={[
                    carouselStyles.indicator,
                    currentIndex === index && carouselStyles.activeIndicator,
                  ]}>
               </View>
            </TouchableOpacity>
            ))}
         </View>
      </View>

      <View style={carouselStyles.rightContainer}>
         <View style={carouselStyles.imageContainer}>
            <Image source={DATA[currentIndex].image} style={carouselStyles.image} />
         </View>
      </View>

   </View>
  );
};


export default Carousel;
