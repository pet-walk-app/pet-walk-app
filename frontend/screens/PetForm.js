import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { useState } from "react";
import { formStyles } from "../styles.js/formStyles";
import { green, white } from "../consts/colors";

import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";


export default function CaregiverProfileForm() {
   const [petName, setPetName] = useState('');
   const [breed, setBreed] = useState('');
   const [description, setDescription] = useState('');

   return (
       <KeyboardAvoidingView 
           style={{ flex: 1 }} 
           behavior="position"
       >
           <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
               <View style={formStyles.container}>
                   <View style={[formStyles.middleSection, { justifyContent: "none" }]}>
                       <Text style={formStyles.h1}>Uzupełnij informacje żeby stworzyć profil zwierzaka</Text>
                       <View style={formStyles.formContainer}>
                           <FormInput
                               value={petName}
                               setValue={setPetName}
                               placeholder={'Imię psa'}
                           />
                           <FormInput
                               value={breed}
                               setValue={setBreed}
                               placeholder={'Rasa'}
                           />
                           <FormBigInput
                               value={description}
                               setValue={setDescription}
                               placeholder={'Opis. Nie zapomnij o charakterze pupila i przyjmowanych lekach.'}
                               height={270}
                           />
                       </View>
                       <CustomButton 
                           color={green} 
                           textColor={white}
                           action={""}
                           title={'Kontynuuj'}
                       />
                   </View>
               </View>
           </ScrollView>
       </KeyboardAvoidingView>
   );
}
