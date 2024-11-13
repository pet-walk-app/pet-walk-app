import { Button, View } from "react-native";

import NoStatusBarView from "../components/NoStatusBarView";

export default function HomeScreen({navigation}) {
  return (
    <NoStatusBarView>
      <Button 
        title="Pierwsza wizyta" 
        onPress={() => navigation.navigate('First Visit Form')} 
      />
      <Button 
        title="Logowanie" 
        onPress={() => navigation.navigate('Login Screen')} 
      />
      <Button 
        title="Rejestracja" 
        onPress={() => navigation.navigate('Registration Screen')} 
      />
      <Button 
        title="Stwórz profile" 
        onPress={() => navigation.navigate('First Visit Profile Choice')} 
      />
      <Button 
        title="Pet Form" 
        onPress={() => navigation.navigate('Pet Form')} 
      />
      <Button 
        title="Pet Form 2" 
        onPress={() => navigation.navigate('Pet Form 2')} 
      />
      <Button 
        title="Caregiver profile form 1" 
        onPress={() => navigation.navigate('Caregiver Profile Form')} 
      />
      <Button 
        title="Caregiver profile form 2" 
        onPress={() => navigation.navigate('Caregiver Profile Form 2')} 
      />
      <Button 
        title="Walk offer" 
        onPress={() => navigation.navigate('Walk Offer')} 
      />
      <Button 
        title="Znalezieni opiekunowie" 
        onPress={() => navigation.navigate('Caregivers Found')} 
      />
      <Button 
        title="Dodawanie oferty" 
        onPress={() => navigation.navigate('Add Offer')} 
      />
      <Button 
        title="Lista ofert spacerów" 
        onPress={() => navigation.navigate('Offers List')} 
      />
      <Button 
        title="Profil opiekuna" 
        onPress={() => navigation.navigate('User Profile')} 
      />
      <Button 
        title="Profil zwierzęcia" 
        onPress={() => navigation.navigate('Pet Profile')} 
      />
      <Button 
        title="Moje oferty" 
        onPress={() => navigation.navigate('My Offers')} 
      />
    </NoStatusBarView>
  );
}