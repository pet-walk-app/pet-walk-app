import { Pressable, Text, View, Image, ScrollView } from "react-native";
import { profileStyles } from "../styles/profileStyles";
import NoStatusBarView from "../components/NoStatusBarView";

export default function PetProfile({navigation}) {
  return (
    <NoStatusBarView padding={40} extraStyle={profileStyles.container}>

      <View style={profileStyles.headerSection}>
        <Text style={profileStyles.h1}>Reksio Groźny</Text>
      </View>
      
      <View style={profileStyles.infoSection}>
        <View style={profileStyles.profileImageContainer}>
          <Image source={require('../assets/grazynka.png')} style={profileStyles.profileImage}/>
        </View>

        <View style={profileStyles.textContainer}>
          <Text style={[profileStyles.text]}>Adres:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>ul. Akacjowa 1/2</Text>
          <Text style={[profileStyles.text]}>Miasto:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>Kraków</Text>
        </View>
      </View>

    <ScrollView>

      <View style={profileStyles.headerSection}>
        <Text style={profileStyles.h1}>Profil Zwierzęcia</Text>
      </View>

      <View style={profileStyles.petSection}>

        <View style={profileStyles.textContainerFullWidth}>
          <Text style={[profileStyles.text]}>Imię:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>Reksio Groźny</Text>
          <Text style={[profileStyles.text]}>Rasa:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>Owczarek syczuański</Text>
          <Text style={[profileStyles.text]}>Charakter:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>niezwykle agresywny</Text>
          <Text style={[profileStyles.text]}>Wiek:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>2 lata</Text>
        </View>

        <Text
          style={profileStyles.h2}>
          Dodatkowe informacje
        </Text>
        <Text 
          style={profileStyles.petDescription}>
          Reksio jet wegetarianinem, cierpi też na nietolerancję laktozy, kotów i dzieci. Generalnie bardzo fajny pies, tylko czasem gryzie. Ale można się przyzwyczaić.
        </Text>

        <Pressable style={profileStyles.button}>
          <Text style={profileStyles.buttonText}>Edytuj</Text>
        </Pressable>
      </View>

      </ScrollView>
    </NoStatusBarView>
  );
}