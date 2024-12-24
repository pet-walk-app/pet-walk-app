import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { addOffer } from "../services/offersApi";
import { getUserPets } from "../services/petApi";
import DatePicker from "../components/DatePicker";
import FormInput from "../components/FormInput";
import FormBigInput from "../components/FormBigInput";
import CustomButton from "../components/CustomButton";
import { formStyles } from "../styles/formStyles";
import NoStatusBarView from "../components/NoStatusBarView";
import { Picker } from "@react-native-picker/picker";
import { formatDate, getFutureDate } from "../utils/commonUtils";
import {PlacePickerSection} from "../components/PlacePickerSection";

export default function AddOfferScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      place: null,
      street: "",
      zipCode: "",
      city: "",
      walkDate: new Date(),
      walkLength: "",
      description: "",
      price: "",
    },
  });

  useEffect(() => {
    const loadPets = async () => {
      try {
        const fetchedPets = await getUserPets();
        setPets(fetchedPets);
        if (fetchedPets.length > 0) {
          setSelectedPetId(fetchedPets[0].id);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania zwierzaków:", error.message);
        Alert.alert("Błąd", "Nie udało się pobrać listy zwierzaków.");
      }
    };

    loadPets();
  }, []);

  const onSubmit = async (data) => {
    if (!selectedPetId) {
      Alert.alert("Błąd", "Proszę wybrać zwierzaka.");
      return;
    }

    const body = {
      address: data.place.formattedAddress,
      city: data.place.city,
      description: data.description,
      petIds: [selectedPetId],
      price: parseFloat(data.price),
      walkDate: formatDate(data.walkDate, "-", true),
      walkLength: parseInt(data.walkLength, 10),
      zipCode: data.place.postalCode,
      latitude: data.place.latitude,
      longitude: data.place.longitude,
    };

    try {
      console.log("Dodawanie oferty:", body);
      await addOffer(body);
      Alert.alert("Sukces", "Oferta została dodana.");
      navigation.goBack();
    } catch (error) {
      console.error("Błąd podczas dodawania oferty:", error.message);
      Alert.alert("Błąd", "Nie udało się dodać oferty. Spróbuj ponownie.");
    }
  };

  return (
    <NoStatusBarView padding={40}>
      <Text style={formStyles.h1}>Dodaj nową ofertę</Text>

      <ScrollView>
        <View style={formStyles.formContainer}>
          <View style={formStyles.formSection}>
            <Text style={formStyles.sectionHeader}>Wybierz zwierzaka</Text>
            <View style={formStyles.formInput}>
              <Picker
                selectedValue={selectedPetId}
                onValueChange={(itemValue) => setSelectedPetId(itemValue)}
              >
                {pets.map((pet) => (
                  <Picker.Item key={pet.id} label={pet.name} value={pet.id} />
                ))}
              </Picker>
            </View>
          </View>
          <PlacePickerSection errors={errors} control={control} navigation={navigation} />

          <View style={formStyles.formSection}>
            <Text style={formStyles.sectionHeader}>Dane spaceru</Text>
            <Controller
              control={control}
              name="walkDate"
              rules={{ required: "Data spaceru jest wymagana" }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
                label={'Data spaceru'}
                date={value}
                setDate={onChange}
                dateMax={getFutureDate(0, 6, 0)}
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
            <Controller
              control={control}
              name="description"
              rules={{ required: "Opis spaceru jest wymagany" }}
              render={({ field: { onChange, value } }) => (
                <FormBigInput
                  value={value}
                  setValue={onChange}
                  placeholder="Opis spaceru"
                  errorMessage={errors.description?.message}
                  height={160}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              rules={{
                required: "Cena jest wymagana",
                validate: (value) =>
                  parseFloat(value) > 0 || "Cena musi być większa od 0",
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  value={value}
                  setValue={onChange}
                  placeholder="Cena (w zł)"
                  errorMessage={errors.price?.message}
                />
              )}
            />
          </View>
        </View>

        <CustomButton
          color="green"
          textColor="white"
          action={handleSubmit(onSubmit)}
          title="Dodaj ofertę"
        />
      </ScrollView>
    </NoStatusBarView>
  );
}
