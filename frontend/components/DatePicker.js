import { Pressable, Text, View } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { formStyles } from '../styles.js/formStyles';
import { formatDate } from '../utils/commonUtils';

const DatePicker = ({ birthdate, setBirthdate }) => {

  const chooseDate = () => {
    DateTimePickerAndroid.open({
      mode: 'date',
      value: birthdate,
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate || birthdate;
        setBirthdate(currentDate);
      },
      minimumDate: new Date(1900, 1, 1),
      maximumDate: new Date(2004, 1, 1),
    });
  };

  return (
    <View>
      <Pressable 
         onPress={chooseDate}
         style={formStyles.formInput}>
        <Text style={formStyles.inputText}>{formatDate(birthdate, ' - ')}</Text>
      </Pressable>
    </View>
  );
};

export default DatePicker;
