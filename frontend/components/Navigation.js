import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { white, green } from '../consts/colors';

import HomeScreen from '../screens/HomeScreen';
import FirstVisitFormScreen from '../screens/FirstVisitFormScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import FirstVisitProfileChoiceScreen from '../screens/FirstVisitProfileChoiceScreen';
import CaregiverProfileFormScreen from '../screens/CaregiverProfileFormScreen';
import CaregiverProfileForm2Screen from '../screens/CaregiverProfileForm2Screen';
import PetFormScreen from '../screens/PetFormScreen';
import PetForm2Screen from '../screens/PetForm2Screen';
import WalkOfferScreen from '../screens/WalkOfferScreen';
import CaregiversFoundScreen from '../screens/CaregiversFoundScreen';
import AddOfferScreen from '../screens/AddOfferScreen';
import OffersListScreen from '../screens/OffersListScreen';


const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
            headerStyle: { backgroundColor: green },
            headerTintColor: white
        }}
      >
        <Stack.Screen name = 'Home' component={HomeScreen}/>
        <Stack.Screen name = 'Login Screen' component={LoginScreen}/>
        <Stack.Screen name = 'Registration Screen' component={RegistrationScreen}/>
        <Stack.Screen name = 'First Visit Form' component={FirstVisitFormScreen}/>
        <Stack.Screen name = 'First Visit Profile Choice' component={FirstVisitProfileChoiceScreen}/>
        <Stack.Screen name = 'Caregiver Profile Form' component={CaregiverProfileFormScreen}/>
        <Stack.Screen name = 'Caregiver Profile Form 2' component={CaregiverProfileForm2Screen}/>
        <Stack.Screen name = 'Pet Form' component={PetFormScreen}/>
        <Stack.Screen name = 'Pet Form 2' component={PetForm2Screen}/>
        <Stack.Screen name = 'Walk Offer' component={WalkOfferScreen}/>
        <Stack.Screen name = 'Caregivers Found' component={CaregiversFoundScreen}/>
        <Stack.Screen name = 'Add Offer' component={AddOfferScreen}/>
        <Stack.Screen name = 'Offers List' component={OffersListScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
 }