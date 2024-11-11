import React from 'react';
import { ScrollView, View } from 'react-native';
import WalkOfferPreview from '../components/WalkOfferPreview';
import NoStatusBarView from '../components/NoStatusBarView';
import OfferListFilter from '../components/OfferListFilter';
import { useState } from 'react';

export default function OffersListScreen({ navigation }) {
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('free');

  return (
    
    <NoStatusBarView padding={20}>
      <OfferListFilter
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />

      <ScrollView>
        <WalkOfferPreview 
          animalName="Burek" 
          breed="Owczarek Niemiecki" 
          distance="2.5" 
          address="Ul. Leśna 12, Warszawa" 
          price="100" 
        />
        <WalkOfferPreview 
          animalName="Burek" 
          breed="Owczarek Niemiecki" 
          distance="2.5" 
          address="Ul. Leśna 12, Warszawa" 
          price="100" 
        />
        <WalkOfferPreview 
          animalName="Burek" 
          breed="Owczarek Niemiecki" 
          distance="2.5" 
          address="Ul. Leśna 12, Warszawa" 
          price="100" 
        />
        <WalkOfferPreview 
          animalName="Burek" 
          breed="Owczarek Niemiecki" 
          distance="2.5" 
          address="Ul. Leśna 12, Warszawa" 
          price="100" 
        />
      </ScrollView>
    </NoStatusBarView>
  );
}
