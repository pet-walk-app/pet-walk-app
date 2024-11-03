import { View, Text, Image } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import { useState, useEffect } from "react";
import CustomButton from "../components/CustomButton";
import { red, lightGreen, beige } from "../consts/colors";

export default function CaregiverProfileForm() {
    const [title, setTitle] = useState("")

    const [myOffer, setMyOffer] = useState(false)
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
        if (myOffer) {
            setTitle("Twoja oferta");
        } else {
            setTitle("Szczegóły oferty");
        }
    }, [myOffer]);

    return (
        <View style={formStyles.container}>
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
               { myOffer ?
               // If it's my offer
               <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 30}}>
                <CustomButton    
                    ownStyle={{width: "40%", borderWidth : 0}}
                    color={red} 
                    action={""}
                    title={'Usuń'}>
                </CustomButton>
                <CustomButton    
                    ownStyle={{width: "40%", borderWidth : 0}}
                    color={lightGreen} 
                    action={""}
                    title={'Edytuj'}>
                </CustomButton>
               </View> : 
               // If it's NOT my offer
               <View style={[formStyles.walkOfferText, , {backgroundColor: beige}]}>
                    <Text>
                        <Text style={{ fontWeight: "bold" }}>Masz pytanie? </Text> {"\n"}
                        Numer telefonu: {phoneNumber}
                    </Text>
                  </View>
               
               }
            </View>
            <Image 
                source={petDefaultPhoto}
                style={formStyles.walkOfferImage}
            />
         </View>
    );
}