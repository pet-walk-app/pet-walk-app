import React from 'react';
import MyOfferPreview, {OfferStatusEnum} from '../components/MyOfferPreview';
import NoStatusBarView from '../components/NoStatusBarView';

import { ScrollView, View, Text } from 'react-native';
import { formStyles } from "../styles/formStyles";

export default function MyOffersScreen({ navigation }) {

  return (  
    <NoStatusBarView padding={20}>
      <Text style={formStyles.h1}>
        Wszystkie oferty
      </Text>
      <ScrollView>
        <MyOfferPreview 
          myOffer={true}
          animalName="Burek" 
          date="13.11.2024"
          found="12"
        />
        <MyOfferPreview 
          myOffer={true}
          animalName="Alex" 
          date="11.11.2024"
          found="2"
        />
        <MyOfferPreview 
          myOffer={false}
          animalName="Alex" 
          date="11.11.2024"
          status={OfferStatusEnum.ACCEPTED}
        />

        <MyOfferPreview 
          myOffer={false}
          animalName="Alex" 
          date="11.11.2024"
          status={OfferStatusEnum.DECLINED}
        />

        <MyOfferPreview 
          myOffer={false}
          animalName="Alex" 
          date="11.11.2024"
          status={OfferStatusEnum.WAITING}
        />

      </ScrollView>
    </NoStatusBarView>
  );
}
