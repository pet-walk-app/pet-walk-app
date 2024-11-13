import { View, Pressable, Text, Image } from "react-native";
import { customButtonStyles } from "../styles/componentsStyles";

export default function CustomButton({color, action, title, textColor, ownStyle={}}) {
    return (
      <Pressable style={[customButtonStyles.button, { backgroundColor: color }, ownStyle]} onPress={() => action()}>
        <View>
          <Text style={[customButtonStyles.buttonText, { color: textColor }]}>{title}</Text>
        </View>
      </Pressable>
    );
  }