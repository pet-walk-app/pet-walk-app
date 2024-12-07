import { Pressable, Text, View, Image, ScrollView } from "react-native";
import { profileStyles } from "../styles/profileStyles";
import NoStatusBarView from "../components/NoStatusBarView";

export default function UserProfile({navigation}) {
  return (
    <NoStatusBarView padding={40} extraStyle={profileStyles.container}>

      <View style={profileStyles.mainHeader}>
          <Text style={profileStyles.h1}>Anna Kowalska</Text>
          <Pressable style={profileStyles.button}
            onPress={() => {navigation.navigate('Edit User')}}>
            <Text style={profileStyles.buttonText}>Edytuj</Text>
          </Pressable>
      </View>

      
      <View style={profileStyles.infoSection}>
        <View style={profileStyles.profileImageContainer}>
          <Image source={require('../assets/grazynka.png')} style={profileStyles.profileImage}/>
        </View>

        <View style={profileStyles.textContainer}>
          <Text style={[profileStyles.text]}>Numer telefonu:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>938-493-829</Text>
          <Text style={[profileStyles.text]}>Adres e-mail:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>mail@mail.com</Text>
          <Text style={[profileStyles.text]}>Data urodzenia:</Text>
          <Text style={[profileStyles.text, profileStyles.boldText]}>21.03.1983</Text>
        </View>
      </View>

    <ScrollView>

      <View style={profileStyles.headerSection}>
        <Text style={profileStyles.h1}>Twoje Zwierzęta</Text>
        <Text>Kliknij ikonę zwierzęcia, aby przejść do edycji</Text>
      </View>

      <View
        style={profileStyles.yourPetsSection}>
          <ScrollView style={profileStyles.petCarousel} horizontal={true}>
            {[...Array(5)].map((_, index) => (
              <View key={index} style={profileStyles.petImageContainer}>
                <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage} />
                <Pressable 
                  style={profileStyles.plusIconContainer}>
                  <Image 
                    source={require('../assets/icons/edit.png')}
                    style={profileStyles.plusIcon}
                  />
                </Pressable>
              </View>
            ))}
          </ScrollView>

        <Pressable style={profileStyles.button}>
          <Text style={profileStyles.buttonText}>Dodaj</Text>
        </Pressable>
      </View>


      <View style={profileStyles.headerSection}>
        <Text style={profileStyles.h1}>Profil Opiekuna</Text>
      </View>

      <View style={profileStyles.caregiverSection}>
        <Text style={profileStyles.h3}>Nie masz jeszcze stworzonego profilu opiekuna.</Text>
        <Pressable style={profileStyles.button}>
          <Text style={profileStyles.buttonText}>Utwórz</Text>
        </Pressable>
        <Text 
          style={profileStyles.caregiverDescription}>
          Ext ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        
        <Text
          style={profileStyles.h2}>
          Zdjęcia opiekuna
        </Text>
        <ScrollView 
          style={profileStyles.petCarousel}
          horizontal={true}>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
          <View style={profileStyles.petImageContainer}>
            <Image source={require('../assets/grazynka.png')} style={profileStyles.petImage}/>
          </View>
        </ScrollView>
        <Pressable 
          style={profileStyles.button}
          onPress={() => navigation.navigate('Caregiver Profile Form 2')}>
          <Text style={profileStyles.buttonText}>Zdjęcia</Text>
        </Pressable>
      </View>

      </ScrollView>
    </NoStatusBarView>
  );
}