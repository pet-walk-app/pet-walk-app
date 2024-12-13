import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { MyOfferPreviewStyles } from "../styles/offerListStyles";
import { useNavigation  } from '@react-navigation/native';
import { red, lightGreen, beige, green, white } from "../consts/colors";

import CustomButton from "../components/CustomButton";

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

  const handleGoToCaregivers = () => {
    navigation.navigate('Caregivers Found');
  };

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
      <View style={[MyOfferPreviewStyles.container, myOffer === true ? { height: 210 } : {}]}>
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
        {myOffer === true && (
          <CustomButton    
            ownStyle={{height: 40, width: "80%", borderWidth : 0}}
            color={beige} 
            action={handleGoToCaregivers}
            title={'Zobacz chętnych'}>
          </CustomButton>
        )}
      </View>
    </Pressable>
  );
};

export default MyOfferPreview;
export { OfferStatusEnum };
