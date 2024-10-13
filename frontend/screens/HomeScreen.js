import { Button, View } from "react-native";

export default function HomeScreen({navigation}) {

    return (
        <View>
            <Button 
                title="Do testowania stron" 
               //  Nawigacja do wybranej strony
                onPress={() => navigation.navigate('First Visit Form')} 
            />

        </View>
    );
}