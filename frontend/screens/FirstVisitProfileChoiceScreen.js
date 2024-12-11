import { View, Text } from "react-native";
import { formStyles } from "../styles/formStyles";
import { StatusBar } from "expo-status-bar";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { getProfile } from "../services/userApi";
import { green, white } from "../consts/colors";

import CustomButton from "../components/CustomButton";
import CreateProfileButton from "../components/CreateProfileButton";
import NoStatusBarView from "../components/NoStatusBarView";


export default function FirstVisitProfileChoiceScreen({navigation}) {
  const [hasCaregiverProfile, setCaregiverProfile] = useState(false)
  const [hasPetownerProfile, setPetownerProfile] = useState(false)

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const profile = await getProfile();
          if (profile.caregiver != null) {
            setCaregiverProfile(true);
          } else {
            setCaregiverProfile(false);
          }
  
          if (profile.petOwner != null) {
            setPetownerProfile(true);
          } else {
            setPetownerProfile(false);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
  
      fetchProfile();
    }, [])
  );


  return (
    <NoStatusBarView>
      <StatusBar hidden></StatusBar>
      <View style={formStyles.middleSection}>
        <Text style={formStyles.h3}>Aby korzystać z pełni aplikacji{"\n"}uzupełnij dodatkowe informacje.{"\n"}Możesz zrobić to później</Text>

        {!hasCaregiverProfile && (
          <CreateProfileButton 
              title={'Profil opiekuna'}
              action={() => navigation.navigate('Caregiver Profile Form')}
              description={'Kliknij tutaj, aby uzupełnić profil opiekuna. Profil opiekuna pozwala na zgłaszanie swojej chęci opieki nad innymi zwierzętami.'}
              image={require('../assets/create-profile-button/user.png')}
          />
        )}

        {!hasPetownerProfile && (
          <CreateProfileButton 
            title={'Profile zwierząt'}
            action={() => navigation.navigate('Pet Form')}
            description={'Kliknij tutaj, aby uzupełnić profile zwierząt. Kiedy Twoje zwierzę będzie potrzebować opieki, jego profil pozwoli Ci na dodanie ogłoszenia.'}
            image={require('../assets/create-profile-button/dog.png')}>
          </CreateProfileButton>
        )}

        <CustomButton 
          color={green} 
          textColor={white}
          title={'Kontynuuj'}
          action={() => navigation.navigate('Offers List')}>
        </CustomButton>
      </View>
      <View style={formStyles.bottomSection}></View>
    </NoStatusBarView>
  );
}