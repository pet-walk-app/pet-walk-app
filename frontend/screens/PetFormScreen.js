import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { useForm, Controller } from "react-hook-form";
import { getPet, savePet } from "../services/petApi";

import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";


export default function PetForm({navigation, route}) {
  const { petId = null } = route.params || {};

  const [petImage, setpetImage] = useState(null)
  const [formTitle, setFormTitle] = useState('')
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await savePet(data, petId)
      navigation.navigate('Pet Form 2', {petId: response.id, photo: petImage});
    } catch (error) {
      Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.")
    }
  };

  useEffect(() => {
    const fetchPetData = async () => {
      if (petId == null) {
        setFormTitle("Uzupełnij informacje żeby stworzyć profil zwierzaka");
      } else {
        setFormTitle("Edytuj dane swojego zwierzaka");
        try {
          const petInfo = await getPet(petId);
          reset({
            name: petInfo.name || "",
            breed: petInfo.breed || "",
            description: petInfo.description || "",
          });
          setpetImage(petInfo.imageUrl)
        } catch (error) {
          console.error("Błąd pobierania danych zwierzaka:", error);
        }
      }
    };
  
    fetchPetData();
  }, [petId]);

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
                  placeholder={'Opis'}
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
