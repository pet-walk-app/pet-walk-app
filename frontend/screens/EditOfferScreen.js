import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { getOfferById, updateOffer } from "../services/offersApi";
import DatePicker from "../components/DatePicker";
import FormInput from "../components/FormInput";
import { formStyles } from "../styles/formStyles";
import TimePicker from "../components/TimePicker";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";
import { formatDate } from "../utils/commonUtils";

export default function EditOfferScreen({ navigation }) {
  const [offer, setOffer] = useState(null); 
  const id = 1;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      street: "",
      zipCode: "",
      city: "",
      walkDate: new Date(1990, 1, 1),
      walkTime: new Date(1990, 1, 1),
      walkLength: "",
    },
  });

  useEffect(() => {
    const loadOfferData = async () => {
      try {
        const fetchedOffer = await getOfferById(id); 
        setOffer(fetchedOffer);

        setValue("street", fetchedOffer.address || "");
        setValue("zipCode", fetchedOffer.zipCode || "");
        setValue("city", fetchedOffer.city || "");
        setValue("walkDate", fetchedOffer.walkDate ? new Date(fetchedOffer.walkDate) : new Date());
        setValue("walkTime", fetchedOffer.walkTime ? new Date(fetchedOffer.walkTime) : new Date());
        setValue("walkLength", fetchedOffer.walkLength?.toString() || "");
      } catch (error) {
        console.error("Błąd podczas ładowania danych oferty:", error.message);
      }
    };

    loadOfferData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
        console.log(offer)
      const body = {
        address: data.street || offer.address,
        city: data.city || offer.city,
        description: offer.description,
        petIds: offer.pets ? offer.pets.map((pet) => pet.id) : [], 
        price: offer.price,
        walkDate: formatDate(data.walkDate || offer.walkDate, "-", true),
        walkLength: parseInt(data.walkLength || offer.walkLength, 10),
        zipCode: data.zipCode || offer.zipCode,
      };

      console.log('\n\n',body,'\n\n');

      await updateOffer(body, id);
      Alert.alert("Sukces", "Dane oferty zostały zaktualizowane.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Błąd", "Wystąpił problem podczas edycji oferty: " + error.message);
    }
  };

  return (
    <NoStatusBarView padding={40}>
      <Text style={formStyles.h1}>Edytuj dane oferty</Text>

      <ScrollView>
        <View style={formStyles.formContainer}>
          <Controller
            control={control}
            name="street"
            rules={{ required: "Ulica jest wymagana" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder="Ulica"
                errorMessage={errors.street?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="zipCode"
            rules={{ required: "Kod pocztowy jest wymagany" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder="Kod pocztowy"
                errorMessage={errors.zipCode?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            rules={{ required: "Miasto jest wymagane" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder="Miasto"
                errorMessage={errors.city?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="walkDate"
            rules={{ required: "Data spaceru jest wymagana" }}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                date={value}
                setDate={onChange}
                errorMessage={errors.walkDate?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="walkLength"
            rules={{ required: "Długość spaceru jest wymagana" }}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                setValue={onChange}
                placeholder="Długość spaceru (w minutach)"
                errorMessage={errors.walkLength?.message}
              />
            )}
          />
        </View>

        <CustomButton
          color="green"
          textColor="white"
          action={handleSubmit(onSubmit)}
          title="Zapisz zmiany"
        />
        <CustomButton
          color="white"
          textColor="green"
          action={() => navigation.goBack()}
          title="Anuluj"
        />
      </ScrollView>
    </NoStatusBarView>
  );
}
