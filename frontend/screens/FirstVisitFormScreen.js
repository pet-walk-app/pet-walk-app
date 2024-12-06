import { View, Text } from "react-native";
import { formStyles } from "../styles/formStyles";
import { useForm, Controller } from "react-hook-form";
import { createProfile } from "../services/authorizationApi";
import { green, white } from "../consts/colors";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import DatePicker from "../components/DatePicker";
import NoStatusBarView from "../components/NoStatusBarView";

export default function FirstVisitFormScreen({navigation}) {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      dateOfBirth: new Date(1990, 1, 1),
    },
  });

  const onSubmit = async (data) => {
    try {
      await createProfile(data)
      //Alert.alert("Success", "Created profile!");
      navigation.navigate('First Visit Profile Choice')
    } catch (error) {
      Alert.alert("Błąd tworzenia profilu", error.message || "Wystąpił błąd podczas tworzenia profilu.")
    }
  };

  return (
    <NoStatusBarView>
      <View style={formStyles.topSection}></View>
      <View style={formStyles.middleSection}>
        <Text style={formStyles.h1}>To Twoja pierwsza wizyta w {"\n"}Pet Walk, uzupełnij swoje informacje</Text>
        <View style={formStyles.formContainer}>
          <Controller
            control={control}
            name="name"
            rules={{ 
              required: "Nazwa jest wymagana",
              pattern: {
                value: /^(?!.*\d).+$/,
                message: "Nazwa nie może zawierać cyfr"
              }
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput 
                value={value}
                setValue={onChange}
                placeholder={'Nazwa użytkownika'}
                errorMessage={errors.name?.message}/>
            )}
          />

          <Controller
            control={control}
            name="phone"
            rules={{ 
              required: "Numer telefonu jest wymagany",
              pattern: {
                value: /^\d{9}$/,
                message: "Numer musi składać się z 9 cyfr",
              }
            }}
            render={({ field: { onChange, value } }) => (
              <FormInput 
                value={value}
                setValue={onChange}
                placeholder={'Numer telefonu'}
                errorMessage={errors.phone?.message}/>
            )}
          />
          <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: "Data jest wymagana" }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                date={value}
                setDate={onChange}
                dateMin={new Date(1990, 1, 1)}
                errorMessage={errors.dateOfBirth?.message}/>
            )}
          />
        </View>

        <CustomButton 
          color={green} 
          textColor={white}
          action={handleSubmit(onSubmit)}
          title={'Kontynuuj'}>
        </CustomButton>
        <CustomButton 
          color={white} 
          textColor={green}
          action={() => navigation.navigate('Login Screen')}
          title={'Wyloguj się'}>
        </CustomButton>
      </View>
      <View style={formStyles.bottomSection}></View>
    </NoStatusBarView>
  );
}