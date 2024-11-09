import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import { useState, useEffect } from "react";
import { green, white } from "../consts/colors";

import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";


export default function CaregiverProfileForm() {
   // True if user uses this form for the first time and creating an account
   // False if user already has an account and is editing it
   const [editingProfile, setEditProfile] = useState(false)

   const [formTitle, setFormTitle] = useState('')
   const [city, setCity] = useState('')
   const [description, setDescription] = useState('')

   useEffect(() => {
      if (editingProfile) {
        setFormTitle("Edytuj informacje profilu opiekuna");
      } else {
        setFormTitle("Uzupełnij swoje informacje żeby stworzyć profil opiekuna");
      }
    }, [editingProfile]);


    return (
      <KeyboardAvoidingView 
           style={{ flex: 1 }} 
           behavior="position"
       >
         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={formStyles.container}>
                  <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
                     <Text style={formStyles.h1}>{formTitle}</Text>
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