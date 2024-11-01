import { View, Text } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { green, white } from "../consts/colors";

export default function CaregiverProfileForm() {
   const [city, setCity] = useState('')
   const [description, setDescription] = useState('')

    return (
        <View style={formStyles.container}>
            <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
               <Text style={formStyles.h1}>Uzupełnij swoje informacje {"\n"}żeby stworzyć profil opiekuna.</Text>
               <View style={formStyles.formContainer}>
                  <FormInput
                     value={city}
                     setValue={setCity}
                     placeholder={'Miasto'}>
                  </FormInput>
                  <FormBigInput 
                     value={description}
                     setValue={setDescription}
                     placeholder={'Napisz kilka słów o sobie'}
                     height={330}>
                  </FormBigInput>
               </View>

               <CustomButton 
                  color={green} 
                  textColor={white}
                  action={""}
                  title={'Kontynuuj'}>
               </CustomButton>
            </View>
         </View>
    );
}