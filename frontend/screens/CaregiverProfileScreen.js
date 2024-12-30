import { Text, View, Image, ScrollView } from "react-native";
import { profileStyles } from "../styles/profileStyles.js";
import NoStatusBarView from "../components/NoStatusBarView.js";
import React from "react";


export default function CaregiverProfile({ route, navigation }) {
  const { caregiverData } = route.params || {};
  console.log(caregiverData)

  const caregiverName = caregiverData?.name || "Nieznane imię";
  const phone = caregiverData?.phone || "Brak numeru";
  const description = caregiverData?.caregiver?.description || "Brak danych";
  const imageUrl = caregiverData?.imageUrl;
  const caregiverImages = caregiverData?.caregiver?.images;

  return (
    
    <NoStatusBarView extraStyle={profileStyles.container} padding={40}>
        <View style={profileStyles.mainHeader}>
          <Text style={profileStyles.h1}>{caregiverName}</Text>
        </View>

        <View style={profileStyles.infoSection}>
          <View style={profileStyles.profileImageContainer}>
          <Image
            source={imageUrl ? { uri: imageUrl } : require("../assets/grazynka.png")}
            style={profileStyles.profileImage}
          />
          </View>

          <View style={profileStyles.textContainer}>
            <Text style={[profileStyles.text]}>Numer telefonu:</Text>
            <Text style={[profileStyles.text, profileStyles.boldText]}>{phone}</Text>
          </View>
        </View>

        <ScrollView style={profileStyles.scrollView}>
          <View style={profileStyles.headerSection}>
            <Text style={profileStyles.h1}>Profil Opiekuna</Text>
          </View>

          <View style={profileStyles.caregiverSection}>
            <Text style={profileStyles.caregiverDescription}>{description}</Text>

              <Text style={profileStyles.h2}>Zdjęcia opiekuna</Text>

              <ScrollView style={profileStyles.petCarousel} horizontal={true}>
                {caregiverImages && caregiverImages.length > 0 ? (
                  caregiverImages.map((image, index) => (
                    <View key={index} style={profileStyles.petImageContainer}>
                      <Image
                        source={{ uri: image.url }}
                        style={profileStyles.petImage}
                      />
                    </View>
                  ))
                ) : (
                  <Text style={profileStyles.text}>Brak zdjęć</Text>
                )}
              </ScrollView>

          </View>
        </ScrollView>
      
    </NoStatusBarView>
  );
}
