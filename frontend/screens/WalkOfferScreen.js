import { View, Text, Image } from "react-native";
import { formStyles } from "../styles/formStyles";
import { useState, useEffect } from "react";
import { red, lightGreen, beige, green, white } from "../consts/colors";
import { applyToOffer, deleteApplyToOffer, deleteOffer } from "../services/offersApi";
import { getProfile } from "../services/userApi";
import { useNavigation  } from '@react-navigation/native';

import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";

const OfferStatus = {
  MY_OFFER: 'myOffer',
  NEW_OFFER: 'newOffer',
  REQUEST_SENT: 'requestSent',
  OFFER_ACCEPTED: 'offerAccepted',
};

export default function WalkOffer({ route }) {
  const navigation = useNavigation();
  const { walkData } = route.params;
  const [title, setTitle] = useState("")

  const [offerType, setMyOffer] = useState(OfferStatus.NEW_OFFER)
  const [walkDate, setWalkDate] = useState('21.04.2024')
  const [address, setAddress] = useState('Ostrów Tumski, 61-001')
  const [city, setCity] = useState('Poznań')
  const [distance, setDistance] = useState(1)
  const petDefaultPhoto = require("../assets/default_dog_picture.png");
  const [petPhoto, setPhoto] = useState(null)
  const [petName, setPetName] = useState('Reksio')
  const [petBreed, setPetBreed] = useState('Owczarek Kaukaski')
  const [petDescrition, setPetDescription] = useState('Pies zazwyczaj nie gryzie, chyba że jest w złym humorze')
  const [walkLength, setWalkLength] = useState('2h')
  const [price, setPrice] = useState('50zł')
  const [phoneNumber, setPhoneNumber] = useState('+48 123 213 224')

  useEffect(() => {
    const fetchProfileAndSetup = async () => {
      try {
        const profile = await getProfile();
        console.log(profile);
        
        //TODO: dodać status gdy mnie zaakceptowano
        if (profile.id == walkData.offerCreator.id){
          setMyOffer(OfferStatus.MY_OFFER);
        }
        else {
            if (walkData.alreadyApplied) {
            setMyOffer(OfferStatus.REQUEST_SENT);
          } else {
            setMyOffer(OfferStatus.NEW_OFFER);
            if (walkData.applicationRejected) {
              setMyOffer(OfferStatus.REQUEST_SENT);
            }
          }
        }
  
        setWalkDate(walkData.walkDate);
        setAddress(null); // TODO: dodać adres
        setCity(null); // TODO: dodać miasto
        setDistance(walkData.distance.toFixed(1));
        console.log(walkData);
        setPhoto(walkData.pets[0]?.imageUrl || null);
        setPetName(walkData.pets[0]?.name || "Brak nazwy");
        setPetBreed(walkData.pets[0]?.breed || "Nieznana rasa");
        setPetDescription(walkData.pets[0]?.description || "Brak opisu");
        setWalkLength(walkData.walkLength);
        setPrice(walkData.price);
        setPhoneNumber(null); // TODO: dodać telefon
  
        if (offerType === OfferStatus.MY_OFFER) {
          setTitle("Twoja oferta");
        } else {
          setTitle("Szczegóły oferty");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchProfileAndSetup();
  }, [offerType, walkData]);

  const handleRemove = () => {
    console.log('Usunięcie');
    deleteOffer(walkData.id);
    navigation.navigate('Offers List')
  };

  const handleEdit = () => {
    //TODO: dodać edycje oferty
    console.log('Edycja');
  };

  const handleApply = () => {
    console.log('Zgłoszono się!');
    applyToOffer(walkData.id);
    walkData.alreadyApplied = true;
    setMyOffer(OfferStatus.REQUEST_SENT);
  };

  const handleWithdrawApplication = () => {
    console.log('Zgłoszenie wycofane!');
    deleteApplyToOffer(walkData.id);
    walkData.alreadyApplied = false;
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
              {address && (
                <>
                  Adres: {address} {"\n"}
                </>
              )}
              Miasto: {city} {"\n"}
              Odległość od ciebie: {distance} km
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
              Data: {walkDate} {"\n"}
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
        source={petPhoto ? { uri: petPhoto } : petDefaultPhoto} 
        style={[
          formStyles.walkOfferImage, 
          petPhoto ? { borderRadius: 40 } : null
        ]}
      />
    </NoStatusBarView>
  );
}