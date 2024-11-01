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

        </View>
    );
}