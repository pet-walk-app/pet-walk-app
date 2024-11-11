import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { green, white, borderGrey } from '../consts/colors';
import { Picker } from '@react-native-picker/picker';
import { offerListStyles } from '../styles/offerListStyles';

const OfferListFilter = ({ distanceFilter, setDistanceFilter, priceFilter, setPriceFilter, onSort }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <View style={offerListStyles.filterContainer}>
      <View style={offerListStyles.buttonsContainer}>
        <Pressable style={[offerListStyles.button, offerListStyles.filterButton]} onPress={toggleFilters}>
          <Text style={offerListStyles.buttonText}>Filtry</Text>
        </Pressable>

        <Pressable style={[offerListStyles.button, offerListStyles.sortButton]} onPress={onSort}>
          <Text style={offerListStyles.buttonText}>Sortuj</Text>
        </Pressable>
      </View>

      {filtersVisible && (
        <View style={offerListStyles.filters}>
          <View style={offerListStyles.filterSection}>
            <Text style={offerListStyles.filterTitle}>Odległość</Text>
            <Picker
              selectedValue={distanceFilter}
              style={offerListStyles.picker}
              onValueChange={(itemValue) => setDistanceFilter(itemValue)}
            >
              <Picker.Item label="< 1 km" value="1" />
              <Picker.Item label="1 - 3 km" value="1-3" />
              <Picker.Item label="3 - 10 km" value="3-10" />
              <Picker.Item label="10 - 20 km" value="10-20" />
              <Picker.Item label="20 - 50 km" value="20-50" />
              <Picker.Item label="Cała Polska" value="all" />
            </Picker>
          </View>

          <View style={offerListStyles.filterSection}>
            <Text style={offerListStyles.filterTitle}>Zapłata za godzinę</Text>
            <Picker
              selectedValue={priceFilter}
              style={offerListStyles.picker}
              onValueChange={(itemValue) => setPriceFilter(itemValue)}
            >
              <Picker.Item label="Za darmo" value="free" />
              <Picker.Item label="Do 10 zł" value="0-10" />
              <Picker.Item label="10 - 25 zł" value="10-25" />
              <Picker.Item label="25 - 50 zł" value="25-50" />
              <Picker.Item label="50 - 100 zł" value="50-100" />
              <Picker.Item label="100 - 200 zł" value="100-200" />
              <Picker.Item label="200 - 500 zł" value="200-500" />
              <Picker.Item label="500+ zł" value="500+" />
            </Picker>
          </View>
        </View>
      )}
    </View>
  );
};

export default OfferListFilter;
