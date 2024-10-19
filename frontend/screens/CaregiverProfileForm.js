import { View, Text } from "react-native";
import { formStyles } from "../styles.js/formStyles";
import FormBigInput from "../components/FormBigInput";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import { green, white } from "../consts/colors";
import {Picker} from '@react-native-picker/picker';

export default function CaregiverProfileForm() {
   const [voivodeship, setVoivodeship] = useState('')
   const [description, setDescription] = useState('')

    return (
        <View style={formStyles.container}>
            <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
               <Text style={formStyles.h1}>Uzupełnij swoje informacje {"\n"}żeby stworzyć profil opiekuna.</Text>
               <View style={formStyles.formContainer}>
               <Text style={formStyles.h2}>Województwo:</Text>
                  <Picker style={formStyles.formInput}
                     selectedValue={voivodeship}
                     onValueChange={(val) => 
                        setVoivodeship(val)
                        }>
                     <Picker.Item label="dolnośląskie" value="dolnośląskie"/>
                     <Picker.Item label="kujawsko-pomorskie" value="kujawsko-pomorskie"/>
                     <Picker.Item label="lubelskie" value="lubelskie"/>
                     <Picker.Item label="lubuskie" value="lubuskie"/>
                     <Picker.Item label="łódzkie" value="łódzkie"/>
                     <Picker.Item label="małopolskie" value="małopolskie"/>
                     <Picker.Item label="mazowieckie" value="mazowieckie"/>
                     <Picker.Item label="opolskie" value="opolskie"/>
                     <Picker.Item label="podkarpackie" value="podkarpackie"/>
                     <Picker.Item label="podlaskie" value="podlaskie"/>
                     <Picker.Item label="pomorskie" value="pomorskie"/>
                     <Picker.Item label="śląskie" value="śląskie"/>
                     <Picker.Item label="świętokrzyskie" value="świętokrzyskie"/>
                     <Picker.Item label="warmińsko-mazurskie" value="warmińsko-mazurskie"/>
                     <Picker.Item label="wielkopolskie" value="wielkopolskie"/>
                     <Picker.Item label="zachodniopomorskie" value="zachodniopomorskie"/>
                  </Picker>
                  
                  <FormBigInput 
                     value={description}
                     setValue={setDescription}
                     placeholder={'Opis'}
                     height={250}>
                  </FormBigInput>
               </View>

               <CustomButton 
                     color={green} 
                     textColor={white}
                     action={""}
                     title={'Kontynuuj'}>
                  </CustomButton>
                  <CustomButton 
                     color={white} 
                     textColor={green}
                     action={''}
                     title={'Wyloguj się'}>
               </CustomButton>

            </View>
        </View>
    );
}