import React from 'react';
import MyOfferPreview, { OfferStatusEnum } from '../components/MyOfferPreview';
import MyOffersFilter from '../components/MyOffersFilter';
import NoStatusBarView from '../components/NoStatusBarView';

import { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import { getOffer } from "../services/userApi";

export default function MyOffersScreen({ navigation }) {
  const [distanceFilter, setDistanceFilter] = useState("1");

  // Tablica ofert
  const [offers, setOffers] = useState([
    //TODO: remove this example data
    /*{ myOffer: true, animalName: "Burek", date: "13.11.2024", found: "12" },
    { myOffer: true, animalName: "Alex", date: "11.11.2024", found: "2" },*/
    { myOffer: false, animalName: "Cezar", date: "11.11.2024", status: OfferStatusEnum.ACCEPTED },
    { myOffer: false, animalName: "Vigo", date: "11.11.2024", status: OfferStatusEnum.DECLINED },
    { myOffer: false, animalName: "Ozzi", date: "11.11.2024", status: OfferStatusEnum.WAITING },
  ]);

  const filteredOffers = offers.filter(offer => {
    if (distanceFilter === "1") return true;
    if (distanceFilter === "2") return offer.myOffer === true;
    if (distanceFilter === "3") return offer.myOffer === false;
    return true;
  });

  useEffect (() => {
    const fetchOffers = async () => {
      try {
        //TODO: change 1 to real id
        const offers = await getOffer(1);

        const newOffer = { 
          myOffer: true, 
          animalName: offers.pets[0].name, 
          date: offers.walkDate, 
          found: offers.applications.length,
          imageUrl: offers.pets[0].imageUrl
        };

        setOffers((prevOffers) => [...prevOffers, newOffer]);

        console.log(offers)
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
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
