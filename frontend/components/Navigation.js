import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FirstVisitFormScreen from '../screens/FirstVisitFormScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import { white, green } from '../consts/colors';
import FirstVisitProfileChoiceScreen from '../screens/FirstVisitProfileChoiceScreen';

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
           </Stack.Navigator>
       </NavigationContainer>
   );
 }