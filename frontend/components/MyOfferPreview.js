import React from 'react';
import { View, Text, Image } from 'react-native';
import { MyOfferPreviewStyles } from '../styles/offerListStyles';
import { useState, useEffect } from "react";

const OfferStatusEnum = {
  ACCEPTED: 'accepted',
  DECLINED: 'declined',
  WAITING: 'waiting',
};

const MyOfferPreview = ({ myOffer, animalName, date, found, status }) => {
  const [isMyOffer, setMyOffer] = useState(myOffer)
  const [offerStatus, setOfferStatus] = useState(status);

  const [title, setTitle] = useState("")
  const [bottomLine, setBottomLine] = useState("")

  useEffect(() => {
    if (isMyOffer) {
      setTitle("Moja oferta");
    } else {
      setTitle("Oferta");
    }
  }, [isMyOffer]);

  useEffect(() => {
    if (isMyOffer) {
      setBottomLine("Znaleziono chętnych: " + found);
    } else {
      switch (offerStatus) {
        case OfferStatusEnum.ACCEPTED:
          setBottomLine("Status: zaakceptowano");
          break;
        case OfferStatusEnum.DECLINED:
          setBottomLine("Status: odrzucono");
          break;
        case OfferStatusEnum.WAITING:
          setBottomLine("Status: oczekiwanie");
          break;
        default:
          setBottomLine("Status: nieznany");
      }
    }
  }, [isMyOffer, offerStatus]);

  return (
    <View style={MyOfferPreviewStyles.container}>
      <Text style={MyOfferPreviewStyles.myOfferTitle}>{title}</Text>
      <View style={MyOfferPreviewStyles.content}>
        <View style={MyOfferPreviewStyles.leftSection}>
          <Image source={require('../assets/default_dog_picture.png')} style={MyOfferPreviewStyles.profileImage} />
        </View>
        <View style={MyOfferPreviewStyles.myOfferMiddleSection}>
          <Text style={MyOfferPreviewStyles.animalName}>{animalName}</Text>
          <Text style={MyOfferPreviewStyles.text}>Data: {date}</Text>
          <Text style={MyOfferPreviewStyles.text}>{bottomLine}</Text>
        </View>
      </View>
    </View>
  );
};

export default MyOfferPreview;
export { OfferStatusEnum };
