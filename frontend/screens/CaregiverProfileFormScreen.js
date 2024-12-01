import { View, Text, ScrollView } from "react-native";
import { formStyles } from "../styles/formStyles";
import { useState, useEffect } from "react";
import { green, white } from "../consts/colors";
import { useForm, Controller } from "react-hook-form";
import { saveCaregiver } from "../services/authorizationApi";

import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";


export default function CaregiverProfileForm({navigation}) {
  // True if user uses this form for the first time and creating an account
  // False if user already has an account and is editing it
  const [editingProfile, setEditProfile] = useState(false)

  const [formTitle, setFormTitle] = useState('')
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await saveCaregiver(data)
      //Alert.alert("Success", "Created profile!");
      navigation.navigate('Caregiver Profile Form 2');
    } catch (error) {
      Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.")
    }
  };

  useEffect(() => {
    if (editingProfile) {
      setFormTitle("Edytuj informacje profilu opiekuna");
    } else {
      setFormTitle("Uzupełnij swoje informacje żeby stworzyć profil opiekuna");
    }
  }, [editingProfile]);


  return (
    <NoStatusBarView 
      style={{ flex: 1 }} 
      behavior="position"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={formStyles.container}>
          <View style={[formStyles.middleSection, {justifyContent: "none"}]}>
            <Text style={formStyles.h1}>{formTitle}</Text>
            <View style={formStyles.formContainer}>
              <Controller
                control={control}
                name="city"
                rules={{ required: "Miasto jest wymagane" }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    value={value}
                    setValue={onChange}
                    placeholder={'Miasto'}
                    errorMessage={errors.city?.message}/>
                )}
              />
              <Controller
                control={control}
                name="description"
                rules={{ required: "Opis jest wymagany" }}
                render={({ field: { onChange, value } }) => (
                  <FormBigInput 
                    value={value}
                    setValue={onChange}
                    placeholder={'Napisz kilka słów o sobie'}
                    errorMessage={errors.description?.message}
                    height={330}/>
                )}
              />
            </View>

            <CustomButton 
              color={green} 
              textColor={white}
              action={handleSubmit(onSubmit)}
              title={'Kontynuuj'}>
            </CustomButton>
          </View>
        </View>
      </ScrollView>
    </NoStatusBarView>
  );
}