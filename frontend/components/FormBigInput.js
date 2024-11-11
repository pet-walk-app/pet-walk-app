import { TextInput } from 'react-native';
import { formStyles } from '../styles/formStyles';
import { darkGrey } from '../consts/colors';

export default function FormBigInput({ 
  value, 
  setValue,
  placeholder,
  height
}) {
  return (
    <TextInput 
      style={formStyles.formBigInput}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => setValue(text)}
      height={height}
      numberOfLines={20}
      multiline={true}
      placeholderTextColor={darkGrey}
    />
  );
}
