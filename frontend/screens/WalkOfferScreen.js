import {View, Text, Image, ScrollView} from "react-native";
import { formStyles } from "../styles/formStyles";
import { useState, useEffect } from "react";
import { red, lightGreen, beige, green, white } from "../consts/colors";
import {applyToOffer, deleteApplyToOffer, deleteOffer, updateOffer} from "../services/offersApi";
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
  const { walkData, onWalkOfferUpdate } = route.params;
  const [userHasCaregiverAccount, setUserHasCaregiverAccount] = useState(false);
  const [currentWalkData, setCurrentWalkData] = useState(walkData);

  const [title, setTitle] = useState("")
  const [offerType, setOfferType] = useState(OfferStatus.NEW_OFFER)
  const [walkDate, setWalkDate] = useState('')
  const [address, setAddress] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [distance, setDistance] = useState()
  const petDefaultPhoto = require("../assets/default_dog_picture.png");
  const [petPhoto, setPhoto] = useState(null)
  const [petName, setPetName] = useState('')
  const [petBreed, setPetBreed] = useState('')
  const [petDescrition, setPetDescription] = useState('')
  const [walkLength, setWalkLength] = useState('')
  const [price, setPrice] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [petOwnerName, setPetOwnerName] = useState('')


  useEffect(() => {
    const fetchProfileAndSetup = async () => {
      try {
        const profile = await getProfile();
        setUserHasCaregiverAccount(profile.caregiver != null);
        if (!currentWalkData.offerCreator || profile.id == currentWalkData.offerCreator.id){
          setOfferType(OfferStatus.MY_OFFER);
        }
        else {
          if (currentWalkData.status == "ACCEPTED"){
            setOfferType(OfferStatus.OFFER_ACCEPTED);
          }
          else if (currentWalkData.alreadyApplied) {
            setOfferType(OfferStatus.REQUEST_SENT);
          }
          else {
            setOfferType(OfferStatus.NEW_OFFER);
            if (currentWalkData.applicationRejected) {
              setOfferType(OfferStatus.REQUEST_SENT);
            }
          }
        }

        setWalkDate(currentWalkData.walkDate);
        setAddress(currentWalkData.address ?? null);
        setZipCode(currentWalkData.zipCode ?? null)
        setCity(currentWalkData.city ?? null);
        setDistance(currentWalkData.distance?.toFixed(1));
        setPhoto(currentWalkData.pets[0]?.imageUrl || null);
        setPetName(currentWalkData.pets[0]?.name || "Brak nazwy");
        setPetBreed(currentWalkData.pets[0]?.breed || "Nieznana rasa");
        setPetDescription(currentWalkData.pets[0]?.description || "Brak opisu");
        setWalkLength(currentWalkData.walkLength);
        setPrice(currentWalkData.price);
        setPetOwnerName(currentWalkData.offerCreator?.name ?? null);
        setPhoneNumber(currentWalkData.offerCreator?.phone ?? null);

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
  }, [offerType, currentWalkData]);

  const handleRemove = () => {
    console.log('Usunięcie');
    deleteOffer(currentWalkData.id);
    navigation.navigate('Offers List')
  };

  const handleEdit = () => {
    navigation.navigate('Edit Offer', { id: currentWalkData.id, onWalkOfferUpdate: (updatedWalkData) => {
        onWalkOfferUpdate(currentWalkData);
        setCurrentWalkData({
          ...currentWalkData,
          ...updatedWalkData,
        });
      }})
    console.log('Edycja');
  };

  const handleApply = () => {
    console.log('Zgłoszono się!');
    applyToOffer(currentWalkData.id);
    currentWalkData.alreadyApplied = true;
    setOfferType(OfferStatus.REQUEST_SENT);
  };

  const handleWithdrawApplication = () => {
    console.log('Zgłoszenie wycofane!');
    deleteApplyToOffer(currentWalkData.id);
    currentWalkData.alreadyApplied = false;
    setOfferType(OfferStatus.NEW_OFFER);
  };

  const handleCreateCaregiverProfile = () => {
    console.log('Create caregiver profile');
    navigation.navigate('Caregiver Profile Form')
  };

  return (
    <NoStatusBarView>
      <ScrollView>
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
                {distance && `Odległość od ciebie: ${distance} km\n`}

                {zipCode && (
                    <>
                          Kod pocztowy: {zipCode} {"\n"}
                    </>
                )}
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

          { offerType == OfferStatus.NEW_OFFER && userHasCaregiverAccount && (
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

          { offerType == OfferStatus.NEW_OFFER && !userHasCaregiverAccount && (
              // if it's an offer I didn't interact with
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 30}}>
                <CustomButton
                    ownStyle={{width: "60%", borderWidth : 0}}
                    color={green}
                    textColor={white}
                    action={handleCreateCaregiverProfile}
                    title={'Załóż profil opiekuna'}>
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
                  <Text style={{ fontWeight: "bold" }}>Kontakt do właściciela </Text> {"\n"}
                  Imię: {petOwnerName} {"\n"}
                  Numer telefonu: {phoneNumber}
                </Text>
              </View>
          )}
        </View>
      </ScrollView>
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