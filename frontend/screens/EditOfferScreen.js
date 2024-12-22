import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { getOfferById, updateOffer } from "../services/offersApi";
import DatePicker from "../components/DatePicker";
import FormInput from "../components/FormInput";
import { formStyles } from "../styles/formStyles";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";
import { formatDate } from "../utils/commonUtils";
import {PlacePickerSection} from "../components/PlacePickerSection";

export default function EditOfferScreen({ navigation, route}) {
  const [offer, setOffer] = useState(null); 
  const { id } = route.params;

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

        setValue("place", {
          formattedAddress: fetchedOffer.address,
            postalCode: fetchedOffer.zipCode,
            city: fetchedOffer.city,
            latitude: fetchedOffer.latitude,
            longitude: fetchedOffer.longitude,
        })
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
      const body = {
        address: data.place.formattedAddress,
        city: data.place.city,
        description: offer.description,
        petIds: offer.pets ? offer.pets.map((pet) => pet.id) : [], 
        price: offer.price,
        walkDate: formatDate(data.walkDate || offer.walkDate, "-", true),
        walkLength: parseInt(data.walkLength || offer.walkLength, 10),
        zipCode: data.place.postalCode,
        latitude: data.place.latitude,
        longitude: data.place.longitude,
      };

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
          <PlacePickerSection errors={errors} control={control} />
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
