import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formStyles } from '../styles/formStyles';
import { formatDate } from '../utils/commonUtils';

const DatePicker = ({
  date,
  setDate,
  dateMax,
  dateMin,
  errorMessage,
  customStyle = formStyles.formInput,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    setIsOpen(false);
  };

  return (
    <View style={formStyles.formInput}>
      <View>
        <Pressable onPress={() => setIsOpen(true)}>
          <Text style={formStyles.inputText}>{formatDate(date, '.')}</Text>
        </Pressable>

        <DateTimePickerModal
          isVisible={isOpen}
          mode="date"
          onConfirm={handleChange}
          date={date}
          maximumDate={dateMax || new Date()}
          minimumDate={dateMin || new Date()}
          onCancel={() => setIsOpen(false)}
        />
      </View>
      {errorMessage && <Text style={formStyles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

export default DatePicker;
