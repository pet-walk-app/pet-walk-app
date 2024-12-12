import React from 'react';
import MyOfferPreview, { OfferStatusEnum } from '../components/MyOfferPreview';
import MyOffersFilter from '../components/MyOffersFilter';
import NoStatusBarView from '../components/NoStatusBarView';

import { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import { getOffer } from "../services/userApi";
import { fetchAllOffers } from '../services/offersApi';

export default function MyOffersScreen({ navigation }) {
  const [distanceFilter, setDistanceFilter] = useState("1");

  // Tablica ofert
  const [offers, setOffers] = useState([]);

  const filteredOffers = offers.filter(offer => {
    if (distanceFilter === "1") return true;
    if (distanceFilter === "2") return offer.myOffer === true;
    if (distanceFilter === "3") return offer.myOffer === false;
    return true;
  });

  useEffect (() => {
    const fetch = async () => {
      try {
        const response = await fetchAllOffers(0, 10, 'WALK_LENGTH', 'DESC');
        console.log(response)
        const offers = response.content;

        const newOffers = offers.map((offer) => ({
          myOffer: true,
          animalName: offer.pets.length > 0 ? offer.pets[0].name : null,
          date: offer.walkDate,
          found: offer.applications.length,
          imageUrl: offer.pets.length > 0 ? offer.pets[0].imageUrl : null
        }));
  
        setOffers((prevOffers) => [...prevOffers, ...newOffers]);

        console.log(offers)
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetch();
  }, [])

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
            imageUrl={offer.imageUrl}
          />
        ))}
      </ScrollView>
    </NoStatusBarView>
  );
}
