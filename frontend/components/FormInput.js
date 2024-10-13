import { Text, View, TextInput } from 'react-native';
import { formStyles } from '../styles.js/formStyles';
import { darkGrey } from '../consts/colors';

export default function FormInput({ 
  value, 
  setValue,
  placeholder
}) {
  return (
      <TextInput 
        style={formStyles.formInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholderTextColor={darkGrey}
      />
  );
}
