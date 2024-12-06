import { View, Text, Image } from "react-native";
import { formStyles } from "../styles/formStyles";
import { useState, useEffect } from "react";
import { red, lightGreen, beige, green, white } from "../consts/colors";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";

const OfferStatus = {
  MY_OFFER: 'myOffer',
  NEW_OFFER: 'newOffer',
  REQUEST_SENT: 'requestSent',
  OFFER_ACCEPTED: 'offerAccepted',
};

export default function CaregiverProfileForm() {
  const [title, setTitle] = useState("")

  const [offerType, setMyOffer] = useState(OfferStatus.NEW_OFFER)
  const [walkDate, setWalkDate] = useState('21.04.2024')
  const [address, setAddress] = useState('Ostrów Tumski, 61-001')
  const [city, setCity] = useState('Poznań')
  const petDefaultPhoto = require("../assets/default_dog_picture.png");
  const [petPhoto, setPhoto] = useState('Reksio')
  const [petName, setPetName] = useState('Reksio')
  const [petBreed, setPetBreed] = useState('Owczarek Kaukaski')
  const [petDescrition, setPetDescription] = useState('Pies zazwyczaj nie gryzie, chyba że jest w złym humorze')
  const [walkLength, setWalkLength] = useState('2h')
  const [price, setPrice] = useState('50zł')
  const [phoneNumber, setPhoneNumber] = useState('+48 123 213 224')

  useEffect(() => {
    if (offerType == OfferStatus.MY_OFFER) {
      setTitle("Twoja oferta");
    } else {
      setTitle("Szczegóły oferty");
    }
  }, [offerType]);

  const handleRemove = () => {
    console.log('Usunięcie');
    
  };

  const handleEdit = () => {
    console.log('Edycja');
    
  };

  const handleApply = () => {
    console.log('Zgłoszono się!');
    setMyOffer(OfferStatus.REQUEST_SENT);
  };

  const handleWithdrawApplication = () => {
    console.log('Zgłoszenie wycofane!');
    setMyOffer(OfferStatus.NEW_OFFER);
  };

  return (
    <NoStatusBarView>
      <View style={[formStyles.walkOfferMiddleSection, {justifyContent: "none"}]}>
        <Text style={formStyles.h1Centered}>{title}</Text>
        <View style={formStyles.walkOffer}>
          <Text style={formStyles.h3Centered}>
            {petName}
          </Text>
          <View style={formStyles.walkOfferText}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Informacje adresowe: </Text> {"\n"}
              Adres: {address} {"\n"}
              Miasto: {city}
            </Text>
          </View>

          <View style={formStyles.walkOfferText}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Karta pupila: </Text> {"\n"}
              Imię: {petName} {"\n"}
              Rasa: {petBreed} {"\n"}
              {"\n"}
              Dodatkowe informacje: {petDescrition}
            </Text>
          </View>

          <View style={formStyles.walkOfferText}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Spacer: </Text> {"\n"}
              Data: <Text style={{ fontWeight: "bold" }}>{walkDate}</Text> {"\n"}
              Czas trwania: {walkLength} {"\n"}
              Budżet: {price}
            </Text>
          </View>
        </View>
        { offerType == OfferStatus.MY_OFFER && (
          // If it's my offer
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 30}}>
          <CustomButton    
            ownStyle={{width: "40%", borderWidth : 0}}
            color={red} 
            action={handleRemove}
            title={'Usuń'}>
          </CustomButton>
          <CustomButton    
            ownStyle={{width: "40%", borderWidth : 0}}
            color={lightGreen} 
            action={handleEdit}
            title={'Edytuj'}>
          </CustomButton>
          </View> 
        )}

        { offerType == OfferStatus.NEW_OFFER && (
          // if it's an offer I didn't interact with
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 30}}>
            <CustomButton    
              ownStyle={{width: "60%", borderWidth : 0}}
              color={green} 
              textColor={white}
              action={handleApply}
              title={'Zgłoś się'}>
            </CustomButton>
          </View> 
        )}

        { offerType == OfferStatus.REQUEST_SENT && (
          // if I applied for the offer
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 30}}>
            <CustomButton    
              ownStyle={{width: "60%", borderWidth : 0}}
              color={red} 
              action={handleWithdrawApplication}
              title={'Wycofaj zgłoszenie'}>
            </CustomButton>
          </View> 
        )}

        { offerType == OfferStatus.OFFER_ACCEPTED && (
          // if offer is accepted by pet owner
          <View style={[formStyles.walkOfferText, , {backgroundColor: beige}]}>
            <Text>
              <Text style={{ fontWeight: "bold" }}>Masz pytanie? </Text> {"\n"}
              Numer telefonu: {phoneNumber}
            </Text>
          </View> 
        )}
      </View>
      <Image 
        source={petDefaultPhoto}
        style={formStyles.walkOfferImage}
      />
    </NoStatusBarView>
  );
}