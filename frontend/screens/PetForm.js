import { View, Text } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { green, white } from "../consts/colors";

export default function CaregiverProfileForm() {
   const [petName, setPetName] = useState('')
   const [breed, setBreed] = useState('')
   const [description, setDescription] = useState('')

    return (
        <View style={formStyles.container}>
            <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
               <Text style={formStyles.h1}>Uzupełnij informacje żeby stworzyć profil zwierzaka</Text>
               <View style={formStyles.formContainer}>
                  <FormInput
                     value={petName}
                     setValue={setPetName}
                     placeholder={'Imię psa'}>
                  </FormInput>
                  <FormInput
                     value={breed}
                     setValue={setBreed}
                     placeholder={'Rasa'}>
                  </FormInput>
                  <FormBigInput 
                     value={description}
                     setValue={setDescription}
                     placeholder={'Opis. Nie zapomnij o jego charakterze pupila i przyjmowanych lekach.'}
                     height={270}>
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