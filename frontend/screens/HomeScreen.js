import { Button, View } from "react-native";

export default function HomeScreen({navigation}) {

    return (
        <View>
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