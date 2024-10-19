import { Text, View, TextInput } from 'react-native';
import { formStyles } from '../styles.js/formStyles';
import { darkGrey } from '../consts/colors';

export default function FormBigInput({ 
  value, 
  setValue,
  placeholder,
  height
}) {
  return (
      <TextInput 
        multiline={true}
        numberOfLines={20}
        style={formStyles.formInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => setValue(text)}
        height={height}
        placeholderTextColor={darkGrey}
        textAlignVertical={"top"}
        paddingVertical={25}
        paddingHorizontal={25}
      />
  );
}
