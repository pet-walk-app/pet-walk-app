import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FirstVisitFormScreen from '../screens/FirstVisitFormScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import { white, green } from '../consts/colors';
import FirstVisitProfileChoiceScreen from '../screens/FirstVisitProfileChoiceScreen';
import CaregiverProfileForm from '../screens/CaregiverProfileForm';
import CaregiverProfileForm2 from '../screens/CaregiverProfileForm2';
import PetForm from '../screens/PetForm';
import PetForm2 from '../screens/PetForm2';
import WalkOffer from '../screens/WalkOffer';

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
               <Stack.Screen name = 'Caregiver Profile Form' component={CaregiverProfileForm}/>
               <Stack.Screen name = 'Caregiver Profile Form 2' component={CaregiverProfileForm2}/>
               <Stack.Screen name = 'Pet Form' component={PetForm}/>
               <Stack.Screen name = 'Pet Form 2' component={PetForm2}/>
               <Stack.Screen name = 'Walk Offer' component={WalkOffer}/>
           </Stack.Navigator>
       </NavigationContainer>
   );
 }