import { TextInput, View, Text } from 'react-native';
import { formStyles } from '../styles/formStyles';
import { darkGrey } from '../consts/colors';

export default function FormInput({ 
  value, 
  setValue,
  placeholder,
  errorMessage,
  secureTextEntry=false
}) {
  return (
    <View>
      <TextInput 
        style={formStyles.formInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholderTextColor={darkGrey}
        secureTextEntry={secureTextEntry}
      />

      {errorMessage && <Text style={formStyles.errorText}>{errorMessage}</Text>}
    </View>
  );
}
