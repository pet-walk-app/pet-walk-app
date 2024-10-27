import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FirstVisitFormScreen from '../screens/FirstVisitFormScreen';
import CaregiverProfileForm from '../screens/CaregiverProfileForm';
import CaregiverProfileForm2 from '../screens/CaregiverProfileForm2';

const Stack = createNativeStackNavigator();

export default function Navigation() {
   return (
       <NavigationContainer>
           <Stack.Navigator 
               initialRouteName='Home'
           >
               <Stack.Screen name = 'Home' component={HomeScreen}/>
               <Stack.Screen name = 'First Visit Form' component={FirstVisitFormScreen}/>
               <Stack.Screen name = 'Caregiver Profile Form' component={CaregiverProfileForm}/>
               <Stack.Screen name = 'Caregiver Profile Form 2' component={CaregiverProfileForm2}/>
           </Stack.Navigator>
       </NavigationContainer>
   );
 }