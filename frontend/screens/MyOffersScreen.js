import React from 'react';
import MyOfferPreview, {OfferStatusEnum} from '../components/MyOfferPreview';
import NoStatusBarView from '../components/NoStatusBarView';

import { ScrollView, View, Text } from 'react-native';
import { formStyles } from "../styles/formStyles";
import BottomMenu from '../components/BottomMenu';

export default function MyOffersScreen({ navigation }) {

  return (  
    <NoStatusBarView>
      <Text style={formStyles.h1}>
        Wszystkie oferty
      </Text>
      <ScrollView style={padding=20}>
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
      <BottomMenu navigation={navigation}></BottomMenu>
    </NoStatusBarView>
  );
}
