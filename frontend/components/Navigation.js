import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import FirstVisitFormScreen from '../screens/FirstVisitFormScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
   return (
       <NavigationContainer>
           <Stack.Navigator 
               initialRouteName='Home'
           >
               <Stack.Screen name = 'Home' component={HomeScreen}/>
               <Stack.Screen name = 'First Visit Form' component={FirstVisitFormScreen}/>
           </Stack.Navigator>
       </NavigationContainer>
   );
 }