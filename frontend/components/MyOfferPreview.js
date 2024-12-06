import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { MyOfferPreviewStyles } from "../styles/offerListStyles";

const OfferStatusEnum = {
  ACCEPTED: "accepted",
  DECLINED: "declined",
  WAITING: "waiting",
};

const MyOfferPreview = ({ myOffer, animalName, date, found, status }) => {
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
  }, [myOffer, status, found]);

  return (
    <View style={MyOfferPreviewStyles.container}>
      <Text style={MyOfferPreviewStyles.myOfferTitle}>{title}</Text>
      <View style={MyOfferPreviewStyles.content}>
        <View style={MyOfferPreviewStyles.leftSection}>
          <Image
            source={require("../assets/default_dog_picture.png")}
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
  );
};

export default MyOfferPreview;
export { OfferStatusEnum };
