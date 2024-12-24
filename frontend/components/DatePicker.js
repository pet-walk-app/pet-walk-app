import React, { useState, useEffect, useRef } from 'react';
import {Animated, Easing, Pressable, Text, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formStyles } from '../styles/formStyles';
import { formatDate } from '../utils/commonUtils';
import {darkGrey} from "../consts/colors";

const DatePicker = ({
  date,
  setDate,
  dateMax,
  dateMin,
  errorMessage,
  customStyle,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    setIsOpen(false);
  };

  return (
    <View style={customStyle || formStyles.formInput}>
      <View>
        <Pressable onPress={() => setIsOpen(true)}>
          {label && (<Text style={formStyles.label}>{label}</Text>)}
          <Text style={[formStyles.inputText, label ? {
                height: '100%',
                paddingTop: 25
              } : {}
          ]}>{formatDate(date, '.')}</Text>
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
