import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { addOffer } from "../services/offersApi";
import { getUserPets } from "../services/petApi";
import DatePicker from "../components/DatePicker";
import FormInput from "../components/FormInput";
import CustomButton from "../components/CustomButton";
import { formStyles } from "../styles/formStyles";
import NoStatusBarView from "../components/NoStatusBarView";
import { Picker } from "@react-native-picker/picker";
import { formatDate, getFutureDate } from "../utils/commonUtils";

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
      address: data.street,
      city: data.city,
      description: data.description,
      petIds: [selectedPetId],
      price: parseFloat(data.price),
      walkDate: formatDate(data.walkDate, "-", true),
      walkLength: parseInt(data.walkLength, 10),
      zipCode: data.zipCode,
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

          <View style={formStyles.formSection}>
            <Text style={formStyles.sectionHeader}>Miejsce spaceru</Text>
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
              rules={{
                required: "Kod pocztowy jest wymagany",
                pattern: {
                  value: /^\d{2}-\d{3}$/,
                  message: "Kod pocztowy musi być w formacie XX-XXX",
                },
              }}
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
          </View>

          <View style={formStyles.formSection}>
            <Text style={formStyles.sectionHeader}>Dane spaceru</Text>
            <Controller
              control={control}
              name="walkDate"
              rules={{ required: "Data spaceru jest wymagana" }}
              render={({ field: { onChange, value } }) => (
                <DatePicker
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
                <FormInput
                  value={value}
                  setValue={onChange}
                  placeholder="Opis spaceru"
                  errorMessage={errors.description?.message}
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
