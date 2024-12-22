import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { offerListStyles } from '../styles/offerListStyles';
import DatePicker from "../components/DatePicker";
import { getFutureDate } from '../utils/commonUtils';

const OfferListFilter = ({ filters, setFilters, onSubmit }) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [walkDateFrom, setWalkDateFrom] = useState(null);
  const [walkDateTo, setWalkDateTo] = useState(null);

  const toggleFilters = () => setFiltersVisible(!filtersVisible);

  const handleDateFromChange = (date) => {
    setWalkDateFrom(date);
    setFilters((prev) => ({ ...prev, walkDateFrom: date }));
  };

  const handleDateToChange = (date) => {
    setWalkDateTo(date);
    setFilters((prev) => ({ ...prev, walkDateTo: date }));
  };

  return (
    <View style={offerListStyles.filterContainer}>
      <View style={offerListStyles.buttonsContainer}>
        <Pressable 
          style={[offerListStyles.button, offerListStyles.filterButton]} onPress={toggleFilters}>
          <Text style={offerListStyles.buttonText}>Filtry</Text>
        </Pressable>

        <Pressable style={[offerListStyles.button, offerListStyles.sortButton]} onPress={() => onSubmit('WALK_DATE', 'ASC')}>
          <Text style={offerListStyles.buttonText}>Zastosuj</Text>
        </Pressable>
      </View>

      {filtersVisible && (
        <View style={offerListStyles.filters}>

            <View style={offerListStyles.doubleSection}>

              <View style={offerListStyles.filterSection}>
                <Text style={offerListStyles.filterTitle}>Cena od</Text>
                <TextInput 
                  style={offerListStyles.input}
                  value={filters.priceFrom ? filters.priceFrom.toString() : ''}
                  keyboardType="numeric"
                  onChangeText={(value) => setFilters((prev) => ({ ...prev, priceFrom: parseInt(value, 10) }))}
                />
              </View> 
              

              <View style={offerListStyles.filterSection}>
                <Text style={offerListStyles.filterTitle}>Cena do</Text>
                <TextInput
                  style={offerListStyles.input}
                  value={filters.priceTo ? filters.priceTo.toString() : ''}
                  keyboardType="numeric"
                  onChangeText={(value) => setFilters((prev) => ({ ...prev, priceTo: parseInt(value, 10) }))}
                />
              </View> 
            </View>

            <View style={offerListStyles.doubleSection}>
              <View style={offerListStyles.filterSection}>
                <Text style={offerListStyles.filterTitle}>Minimalna długość spaceru (min)</Text>
                <TextInput
                  style={offerListStyles.input}
                  value={filters.minTime ? filters.minTime.toString() : ''}
                  keyboardType="numeric"
                  onChangeText={(value) => setFilters((prev) => ({ ...prev, minTime: parseInt(value, 10) }))}
                />
              </View>

              <View style={offerListStyles.filterSection}>
              <Text style={offerListStyles.filterTitle}>Maksymalna długość spaceru (min)</Text>
                <TextInput
                  style={offerListStyles.input}
                  value={filters.maxTime ? filters.maxTime.toString() : ''}
                  keyboardType="numeric"
                  onChangeText={(value) => setFilters((prev) => ({ ...prev, maxTime: parseInt(value, 10) }))}
                />
              </View>
            </View>

            <View style={offerListStyles.doubleSection}>
            <View style={offerListStyles.filterSection}>
              <Text style={offerListStyles.filterTitle}>Data od</Text>
                <DatePicker
                  date={walkDateFrom || new Date()}
                  setDate={handleDateFromChange}
                  dateMin={new Date()}
                  dateMax={getFutureDate(0, 0, 1)}
                  customStyle={offerListStyles.input}
                />
            </View>
            <View style={offerListStyles.filterSection}>
              <Text style={offerListStyles.filterTitle}>Data do</Text>
              <DatePicker
                date={walkDateTo || new Date()}
                setDate={handleDateToChange}
                dateMin={new Date()}
                dateMax={getFutureDate(0, 0, 1)}
                customStyle={offerListStyles.input}
              />
            </View>
          </View>

            <View style={offerListStyles.filterSection}>
              <Text style={offerListStyles.filterTitle}>Maksymalna odległość (km)</Text>
              <TextInput
                style={offerListStyles.input}
                value={filters.radius ? (filters.radius / 1000).toString() : ''}
                keyboardType="numeric"
                onChangeText={(value) => setFilters((prev) => ({ ...prev, radius: parseFloat(value * 1000) }))}
              />
            </View>

        </View>
      )}
    </View>
  );
};

export default OfferListFilter;

