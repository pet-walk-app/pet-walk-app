import React from 'react';
import MyOfferPreview, { OfferStatusEnum } from '../components/MyOfferPreview';
import MyOffersFilter from '../components/MyOffersFilter';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoStatusBarView from '../components/NoStatusBarView';

import { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import { getOffer } from "../services/userApi";
import { fetchMyAllOffers, fetchPendingOffers } from '../services/offersApi';

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
    const fetchMyOffers = async () => {
      const user = await AsyncStorage.getItem("user");
      let parsedUser = null;
      if (user) {
        parsedUser = JSON.parse(user);
      }

      if (parsedUser && parsedUser.petOwner != null)
      {
        try {
          const response = await fetchMyAllOffers(0, 10, 'WALK_LENGTH', 'DESC');

          const offers = response.content;
          if (offers == null)
            return;
  
          const newOffers = offers.map((offer) => ({
            myOffer: true,
            animalName: offer.pets.length > 0 ? offer.pets[0].name : null,
            date: offer.walkDate,
            found: offer.applications.length,
            imageUrl: offer.pets.length > 0 ? offer.pets[0].imageUrl : null
          }));
    
          setOffers((prevOffers) => [...prevOffers, ...newOffers]);
  
          //console.log(offers)
        } catch (error) {
          console.error("Error fetching offers:", error);
        }
      }
    };
    //TODO: dodać jeszcze zbieranie oferty które zostały zaakceptowane - /api/v1/caregiver/offers?page=0&page_size=10
    const fetchOtherOffers = async () => {
      try {
        const response = await fetchPendingOffers(0, 10);
        const offers = response.content;
        if (offers == null)
          return;

        const newOffers = offers.map((offer) => ({
          myOffer: false,
          animalName: offer.pets.length > 0 ? offer.pets[0].name : null,
          date: offer.walkDate,
          imageUrl: offer.pets.length > 0 ? offer.pets[0].imageUrl : null,
          status: offer.status
        }));
  
        setOffers((prevOffers) => [...prevOffers, ...newOffers]);

      } catch (error) {
        console.error("Error fetching other offers:", error);
      }
    };
    
    fetchMyOffers();
    fetchOtherOffers();
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
