import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { offerListStyles } from '../styles/offerListStyles';

const MyOffersFilter = ({ distanceFilter, setDistanceFilter }) => {
  return (
      <View style={offerListStyles.filters}>
        <View style={offerListStyles.filterSection}>
          <Text style={offerListStyles.filterTitle}>Filtruj</Text>
          <Picker
            selectedValue={distanceFilter}
            style={offerListStyles.picker}
            onValueChange={(itemValue) => setDistanceFilter(itemValue)}
          >
          <Picker.Item label="Wszystkie oferty" value="1" />
          <Picker.Item label="Moje oferty" value="2" />
          <Picker.Item label="Oferty na które aplikowałem" value="3" />
          </Picker>
        </View>
    </View>
  );
};

export default MyOffersFilter;
