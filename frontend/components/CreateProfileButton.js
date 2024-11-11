import { View, Pressable, Text, Image } from "react-native";
import { createProfileButtonStyles } from "../styles/componentsStyles";

export default function CreateProfileButton({action, title, description, image}) {
  return (
    <Pressable onPress={() => {action}}>
      <View style={createProfileButtonStyles.container}>

      <View style={createProfileButtonStyles.iconContainer}>
        <Image source={image} style={createProfileButtonStyles.image} />
      </View>

      <View style={createProfileButtonStyles.textContainer}>
        <Text style={createProfileButtonStyles.titleText}>{title}</Text>
        <Text style={createProfileButtonStyles.descriptionText}>{description}</Text>
      </View>

      <Pressable style={createProfileButtonStyles.iconContainer}>
        <Image source={require('../assets/icons/plus-icon.png')} style={createProfileButtonStyles.image} />
      </Pressable>

      </View>
    </Pressable>
  );
  }