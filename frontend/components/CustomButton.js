import { View, Pressable, Text, Image } from "react-native";
import { formStyles } from "../styles.js/formStyles";

export default function CustomButton({color, action, title, textColor}) {
    return (
      <Pressable style={[formStyles.button, { backgroundColor: color }]} onPress={() => {action}}>
        <View>
          <Text style={[formStyles.buttonText, { color: textColor }]}>{title}</Text>
        </View>
      </Pressable>
    );
  }