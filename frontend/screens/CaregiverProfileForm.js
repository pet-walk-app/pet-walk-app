import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import { useState } from "react";
import { green, white } from "../consts/colors";

import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";


export default function CaregiverProfileForm() {
   const [city, setCity] = useState('')
   const [description, setDescription] = useState('')

    return (
      <KeyboardAvoidingView 
           style={{ flex: 1 }} 
           behavior="position"
       >
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
         </ScrollView>
       </KeyboardAvoidingView>
    );
}