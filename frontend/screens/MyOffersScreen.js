import React from 'react';
import MyOfferPreview, { OfferStatusEnum } from '../components/MyOfferPreview';
import MyOffersFilter from '../components/MyOffersFilter';
import NoStatusBarView from '../components/NoStatusBarView';
import BottomMenu from '../components/BottomMenu';

import { ScrollView } from 'react-native';
import { useState } from 'react';

export default function MyOffersScreen({ navigation }) {
  const [distanceFilter, setDistanceFilter] = useState("1");

  // Tablica ofert
  const offers = [
    { myOffer: true, animalName: "Burek", date: "13.11.2024", found: "12" },
    { myOffer: true, animalName: "Alex", date: "11.11.2024", found: "2" },
    { myOffer: false, animalName: "Alex", date: "11.11.2024", status: OfferStatusEnum.ACCEPTED },
    { myOffer: false, animalName: "Alex", date: "11.11.2024", status: OfferStatusEnum.DECLINED },
    { myOffer: false, animalName: "Alex", date: "11.11.2024", status: OfferStatusEnum.WAITING },
  ];

  const filteredOffers = offers.filter(offer => {
    if (distanceFilter === "1") return true;
    if (distanceFilter === "2") return offer.myOffer === true;
    if (distanceFilter === "3") return offer.myOffer === false;
    return true;
  });

  return (
    <NoStatusBarView padding={20}>
      <MyOffersFilter
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
      />

      <ScrollView style={{ padding: 10 }}>
        {filteredOffers.map((offer, index) => (
          <MyOfferPreview
            key={index}
            myOffer={offer.myOffer}
            animalName={offer.animalName}
            date={offer.date}
            found={offer.found}
            status={offer.status}
          />
        ))}
      </ScrollView>

      <BottomMenu navigation={navigation} />
    </NoStatusBarView>
  );
}
