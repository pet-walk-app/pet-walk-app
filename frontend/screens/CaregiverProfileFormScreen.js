import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ScrollView, Alert } from "react-native";
import { formStyles } from "../styles/formStyles";
import { green, white } from "../consts/colors";
import { useForm, Controller } from "react-hook-form";
import { getProfile } from "../services/userApi";
import { saveCaregiver } from "../services/caregiverApi";

import FormBigInput from "../components/FormBigInput";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";

export default function CaregiverProfileForm({ route, navigation }) {
  const [editingProfile, setEditProfile] = useState(route?.params?.edit ?? false);
  const [formTitle, setFormTitle] = useState('');

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      city: '',
      description: '',
    },
  });

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const profile = await getProfile();

          if (profile.caregiver) {
            setFormTitle("Edytuj informacje profilu opiekuna");
            if (profile.caregiver.city) {
              setValue("city", profile.caregiver.city);
            }
            if (profile.caregiver.description) {
              setValue("description", profile.caregiver.description);
            }
          } else {
            setFormTitle("Uzupełnij swoje informacje żeby stworzyć profil opiekuna");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }, [setValue])
  );

  const onSubmit = async (data) => {
    try {
      await saveCaregiver(data);
      navigation.navigate('Caregiver Profile Form 2', {
        edit: editingProfile,
      });
    } catch (error) {
      Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.");
    }
  };

  return (
    <NoStatusBarView>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={formStyles.container}>
          <View style={[formStyles.middleSection, { justifyContent: "none" }]}>
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
                    errorMessage={errors.city?.message}
                  />
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
                    height={330}
                  />
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
