import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { getOfferById, updateOffer } from "../services/offersApi";
import { getUserPets } from "../services/petApi";
import DatePicker from "../components/DatePicker";
import FormInput from "../components/FormInput";
import FormBigInput from "../components/FormBigInput";
import { formStyles } from "../styles/formStyles";
import CustomButton from "../components/CustomButton";
import NoStatusBarView from "../components/NoStatusBarView";
import { Picker } from "@react-native-picker/picker";
import { formatDate } from "../utils/commonUtils";
import { PlacePickerSection } from "../components/PlacePickerSection";
import { getFutureDate } from "../utils/commonUtils";

export default function EditOfferScreen({ navigation, route }) {
  const [offer, setOffer] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const { id, onWalkOfferUpdate } = route.params;

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
      walkTime: new Date(),
      walkLength: "",
      description: "",
      price: "",
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
        });
        setValue("walkDate", fetchedOffer.walkDate ? new Date(fetchedOffer.walkDate) : new Date());
        setValue("walkTime", fetchedOffer.walkTime ? new Date(fetchedOffer.walkTime) : new Date());
        setValue("walkLength", fetchedOffer.walkLength?.toString() || "");
        setValue("description", fetchedOffer.description || "");
        setValue("price", fetchedOffer.price?.toString() || "");
        setSelectedPetId(fetchedOffer.pets[0]?.id);
      } catch (error) {
        console.error("Błąd podczas ładowania danych oferty:", error.message);
      }
    };

    const loadPets = async () => {
      try {
        const fetchedPets = await getUserPets();
        setPets(fetchedPets);
      } catch (error) {
        console.error("Błąd podczas pobierania zwierzaków:", error.message);
      }
    };

    loadOfferData();
    loadPets();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const body = {
        address: data.place.formattedAddress,
        city: data.place.city,
        description: data.description,
        petIds: [selectedPetId],
        price: parseFloat(data.price),
        walkDate: formatDate(data.walkDate, "-", true),
        walkTime: formatDate(data.walkTime, ":", false),
        walkLength: parseInt(data.walkLength, 10),
        zipCode: data.place.postalCode,
        latitude: data.place.latitude,
        longitude: data.place.longitude,
      };

      const updatedOffer = await updateOffer(body, id);
      Alert.alert("Sukces", "Dane oferty zostały zaktualizowane.");
      onWalkOfferUpdate(updatedOffer);
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
              rules={{ required: "Cena jest wymagana" }}
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
