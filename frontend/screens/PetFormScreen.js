import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { useForm, Controller } from "react-hook-form";
import { savePet } from "../services/petApi";

import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";


export default function CaregiverProfileForm({navigation}) {
  // True if user uses this form for the first time and creating an account
  // False if user already has an account and is editing it
  const [editingProfile, setEditProfile] = useState(false)

  const [formTitle, setFormTitle] = useState('')
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await savePet(data)
      Alert.alert("Success", "Created profile!");
      navigation.navigate('Pet Form 2');
    } catch (error) {
      Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.")
    }
  };

  useEffect(() => {
    if (editingProfile) {
      setFormTitle("Edytuj dane swojego zwierzaka");
    } else {
      setFormTitle("Uzupełnij informacje żeby stworzyć profil zwierzaka");
    }
  }, [editingProfile]);

return (
    <NoStatusBarView 
        style={{ flex: 1 }} 
        behavior="position"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={formStyles.container}>
          <View style={[formStyles.middleSection, { justifyContent: "none" }]}>
            <Text style={formStyles.h1}>{formTitle}</Text>
            <View style={formStyles.formContainer}>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Imię jest wymagane" }}
                render={({ field: { onChange, value } }) => (
                  <FormInput
                    value={value}
                    setValue={onChange}
                    placeholder={'Imię psa'}
                    errorMessage={errors.name?.message}/>
                )}
              />
              <Controller
                control={control}
                name="breed"
                rules={{ required: "Rasa jest wymagana" }}
                render={({ field: { onChange, value } }) => (
                <FormInput
                  value={value}
                  setValue={onChange}
                  placeholder={'Rasa'}
                  errorMessage={errors.breed?.message}/>
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
                  placeholder={'Opis. Nie zapomnij o charakterze pupila i przyjmowanych lekach.'}
                  height={270}
                  errorMessage={errors.description?.message}/>
                )}
              />
            </View>
            <CustomButton 
              color={green} 
              textColor={white}
              action={handleSubmit(onSubmit)}
              title={'Kontynuuj'}
            />
          </View>
        </View>
      </ScrollView>
    </NoStatusBarView>
  );
}
