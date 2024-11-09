import { View, Text } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import { StatusBar } from "expo-status-bar";
import { green, white } from "../consts/colors";

import CustomButton from "../components/CustomButton";
import CreateProfileButton from "../components/CreateProfileButton";


export default function FirstVisitProfileChoiceScreen({navigation}) {
  return (
    <View style={formStyles.container}>
      <StatusBar hidden></StatusBar>
      <View style={formStyles.middleSection}>
        <Text style={formStyles.h3}>Aby korzystać z pełni aplikacji{"\n"}uzupełnij dodatkowe informacje.{"\n"}Możesz zrobić to później</Text>

        <CreateProfileButton 
          title={'Profil opiekuna'}
          description={'Kliknij tutaj, aby uzupełnić profil opiekuna. Profil opiekuna pozwala na zgłaszanie swojej chęci opieki nad innymi zwierzętami.'}
          image={require('../assets/create-profile-button/user.png')}>
        </CreateProfileButton>

        <CreateProfileButton 
          title={'Profile zwierząt'}
          description={'Kliknij tutaj, aby uzupełnić profile zwierząt. Kiedy Twoje zwierzę będzie potrzebować opieki, jego profil pozwoli Ci na dodanie ogłoszenia.'}
          image={require('../assets/create-profile-button/dog.png')}>
        </CreateProfileButton>

        <CustomButton 
          color={green} 
          textColor={white}
          action={''}
          title={'Kontynuuj'}>
        </CustomButton>
      </View>
      <View style={formStyles.bottomSection}></View>
    </View>
  );
}