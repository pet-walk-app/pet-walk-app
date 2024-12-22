import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import WalkOfferPreview from '../components/WalkOfferPreview';
import NoStatusBarView from '../components/NoStatusBarView';
import OfferListFilter from '../components/OfferListFilter';
import BottomMenu from '../components/BottomMenu';
import { fetchOffers } from '../services/offersApi';
import { minsToHours } from '../utils/commonUtils';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


export default function OffersListScreen({ navigation }) {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    priceFrom: null,
    priceTo: null,
    minTime: null,
    maxTime: null,
    walkDateFrom: null,
    walkDateTo: null,
    radius: null
  });

  const loadOffers = async (sortBy = 'WALK_DATE', sortOrder = 'ASC', isNextPage = false) => {
    if (isNextPage && !hasMore) return;

    setIsLoading(true);

    try {
      const response = await fetchOffers(
        isNextPage ? page + 1 : 0,
        4,
        sortBy,
        sortOrder,
        filters
      );

      const newOffers = response.content || [];

      const uniqueOffers = [
        ...(isNextPage ? offers : []),
        ...newOffers,
      ].filter((offer, index, self) => 
        index === self.findIndex((o) => o.id === offer.id)
      );

      setOffers(uniqueOffers);
      setHasMore(!response.last);
      if (isNextPage) setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error loading offers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      loadOffers('WALK_DATE', 'ASC', true);
    }
  };

  useEffect(() => {
    setPage(0);
    setHasMore(true);
    loadOffers();
  }, [filters]);

  useFocusEffect(
    useCallback(() => {
      setPage(0);
      setHasMore(true);
      loadOffers();
    }, [])
  );
   
  return (
    <NoStatusBarView>
      <OfferListFilter filters={filters} setFilters={setFilters} onSubmit={loadOffers} />
      {isLoading && page === 0 ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={offers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => navigation.navigate('Walk Offer', { walkData: item })}>
              <WalkOfferPreview
                animalName={item.pets[0]?.name || 'Brak nazwy'}
                breed={item.pets[0]?.breed || 'Nieznana rasa'}
                distance={`${(item.distance).toFixed(1)}` || 'Nieznana odległość'}
                date={item.walkDate || 'Brak daty spaceru'}
                length={minsToHours(item.walkLength) || 'Brak długości spaceru'}
                price={item.price || 'Brak ceny'}
                imageUrl={item.pets[0]?.imageUrl || ''}
              />
            </Pressable>
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading && <ActivityIndicator size="large" color="#0000ff" />
          }
        />
      )}
      <BottomMenu navigation={navigation} />
    </NoStatusBarView>
  );
}
