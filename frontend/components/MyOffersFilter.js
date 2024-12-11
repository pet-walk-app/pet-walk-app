import React from 'react';
import { View, Text } from 'react-native';
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
          <Picker.Item label="Moje ogłoszenia" value="2" />
          <Picker.Item label="Moje aplikacje" value="3" />
          </Picker>
        </View>
    </View>
  );
};

export default MyOffersFilter;
