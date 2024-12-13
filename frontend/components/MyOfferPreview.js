import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { MyOfferPreviewStyles } from "../styles/offerListStyles";
import { useNavigation  } from '@react-navigation/native';

//TODO: ustawić poprawnie resztę statusów(to co jest w cudzysłowiach)
const OfferStatusEnum = {
  ACCEPTED: "ACCEPTED",
  CANCELLED: "CANCELLED",
  OPEN: "OPEN",
};

const MyOfferPreview = ({ walkData, myOffer, animalName, date, found, status, imageUrl = null }) => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [bottomLine, setBottomLine] = useState("");

  useEffect(() => {
    if (myOffer) {
      setTitle("Moja oferta");
      setBottomLine(`Znaleziono chętnych: ${found}`);
    } else {
      setTitle("Oferta");
      switch (status) {
        case OfferStatusEnum.ACCEPTED:
          setBottomLine("Status: zaakceptowano");
          break;
        case OfferStatusEnum.CANCELLED:
          setBottomLine("Status: odrzucono");
          break;
        case OfferStatusEnum.OPEN:
          setBottomLine("Status: oczekiwanie");
          break;
        default:
          setBottomLine("Status: nieznany");
      }
    }
  }, [myOffer, status, found]);

  const onClick = () => {
    navigation.navigate('Walk Offer', { walkData: walkData });
  };

  return (
    <Pressable onPress={onClick}>
      <View style={MyOfferPreviewStyles.container}>
        <Text style={MyOfferPreviewStyles.myOfferTitle}>{title}</Text>
        <View style={MyOfferPreviewStyles.content}>
          <View style={MyOfferPreviewStyles.leftSection}>
            <Image
              source={imageUrl != null ? { uri: imageUrl } : require("../assets/default_dog_picture.png")}
              style={MyOfferPreviewStyles.profileImage}
            />
          </View>
          <View style={MyOfferPreviewStyles.myOfferMiddleSection}>
            <Text style={MyOfferPreviewStyles.animalName}>{animalName}</Text>
            <Text style={MyOfferPreviewStyles.text}>Data: {date}</Text>
            <Text style={MyOfferPreviewStyles.text}>{bottomLine}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MyOfferPreview;
export { OfferStatusEnum };
