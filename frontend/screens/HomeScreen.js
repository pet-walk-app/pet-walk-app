import { Button, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({navigation}) {

    return (
        <View>
            <StatusBar hidden></StatusBar>
            <Button 
                title="Pierwsza wizyta" 
                onPress={() => navigation.navigate('First Visit Form')} 
            />
            <Button 
                title="Logowanie" 
                onPress={() => navigation.navigate('Login Screen')} 
            />
            <Button 
                title="Rejestracja" 
                onPress={() => navigation.navigate('Registration Screen')} 
            />
            <Button 
                title="Stwórz profile" 
                onPress={() => navigation.navigate('First Visit Profile Choice')} 
            />
            <Button 
                title="Pet Form" 
               //  Nawigacja do wybranej strony
                onPress={() => navigation.navigate('Pet Form')} 
            />
            <Button 
                title="Pet Form 2" 
               //  Nawigacja do wybranej strony
                onPress={() => navigation.navigate('Pet Form 2')} 
            />
            <Button 
                title="Caregiver profile form 1" 
               //  Nawigacja do wybranej strony
                onPress={() => navigation.navigate('Caregiver Profile Form')} 
            />
            <Button 
                title="Caregiver profile form 2" 
               //  Nawigacja do wybranej strony
                onPress={() => navigation.navigate('Caregiver Profile Form 2')} 
            />
        </View>
    );
}