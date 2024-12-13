import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import WalkOfferPreview from '../components/WalkOfferPreview';
import NoStatusBarView from '../components/NoStatusBarView';
import OfferListFilter from '../components/OfferListFilter';
import BottomMenu from '../components/BottomMenu';
import { fetchOffers } from '../services/offersApi';
import { minsToHours } from '../utils/commonUtils';

export default function OffersListScreen({ navigation }) {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceFrom: null,
    priceTo: null,
    minTime: null,
    maxTime: null,
    walkDateFrom: null,
    walkDateTo: null,
    radius: null,
    latitude: 0,
    longitude: 0
  });
  
  const loadOffers = async (sortBy = 'WALK_LENGTH', sortOrder = 'DESC') => {
    console.log('sortBy:', sortBy);
    setIsLoading(true);
    try {
      const response = await fetchOffers(0, 10, sortBy, sortOrder, filters);
      setOffers(response.content || []);
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    loadOffers();
  }, []);

  return (
<NoStatusBarView>
  <OfferListFilter filters={filters} setFilters={setFilters} onSubmit={loadOffers}/>
  {isLoading ? (
    <ActivityIndicator size="large" color="#0000ff" />
  ) : (
    <FlatList
      data={offers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable 
          onPress={() => navigation.navigate('Walk Offer', { walkData: item })}>
          <WalkOfferPreview
            animalName={item.pets[0]?.name || 'Brak nazwy'}
            breed={item.pets[0]?.breed || 'Nieznana rasa'}
            distance={`${(item.distance).toFixed(1)}` || 'Nieznana odległość'}
            date={item.walkDate || 'Brak daty spaceru'}
            length={minsToHours(item.walkLength) || 'Brak długości spaceru'}
            price={item.price || 'Brak ceny'}
          />
        </Pressable>
      )}
    />
  )}
  <BottomMenu navigation={navigation} />
</NoStatusBarView>

  );
}
