import { useState } from "react";
import {View, Text, Alert} from "react-native";
import { formStyles } from "../styles/formStyles";
import { loginStyles } from "../styles/loginFirstVisitStyles";
import { green, white } from "../consts/colors";
import { useForm, Controller } from "react-hook-form";
import { fetchUserData } from "../services/userApi";
import { loginUser } from "../services/authorizationApi";
import { getProfile } from "../services/userApi";

import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";
import Carousel from "../components/Carousel";



export default function LoginScreen({navigation}) {

  const [isLogged, setIsLogged] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data)
      setIsLogged(true);
      fetchUserData();

      const profile = await getProfile();
      console.log(profile.firstVisit)

      
      if (profile.firstVisit) {
        navigation.replace('First Visit Form');
      } else {
        if (profile.caregiver || profile.petOwner) {
          navigation.replace('Offers List');
        }
        else {
          navigation.replace('First Visit Profile Choice');
        }
      }
    } catch (error) {
      Alert.alert("Błąd logowania", error.message || "Wystąpił błąd podczas logowania.")
      setIsLogged(false);
    }
  };

  return (
    <NoStatusBarView>
        <View style={formStyles.topSection}></View>
        <View style={formStyles.middleSection}>

          <Text style={formStyles.h1}>Aby przejść dalej, zaloguj się na konto</Text>
          <View style={loginStyles.formContainer}>
            <Carousel />
            <Controller
                control={control}
                name="email"
                rules={{
                  required: "E-mail jest wymagany",
                  pattern: {
                    value: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9.-]+$/,
                    message: "Niepoprawny format adresu e-mail"
                  }
                }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                        value={value}
                        setValue={onChange}
                        placeholder="E-mail"
                        errorMessage={errors.email?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="password"
                rules={{ required: "Hasło jest wymagane" }}
                render={({ field: { onChange, value } }) => (
                    <FormInput
                        value={value}
                        setValue={onChange}
                        placeholder="Hasło"
                        secureTextEntry={true}
                        errorMessage={errors.password?.message}
                    />
                )}
            />
          </View>

          <CustomButton
              color={green}
              textColor={white}
              action={() => {
                handleSubmit(onSubmit)();
              }}
              title={'Kontynuuj'}>
          </CustomButton>
          <CustomButton
              color={white}
              textColor={green}
              action={() => navigation.navigate('Registration Screen')}
              title={'Załóż konto'}>
          </CustomButton>
        </View>
    </NoStatusBarView>
  );
}