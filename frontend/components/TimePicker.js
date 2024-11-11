import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formStyles } from '../styles/formStyles';
import { formatTime } from '../utils/commonUtils';

const TimePicker = ({ time, setTime, timeLimit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (time) => {
    setTime(time);
    setIsOpen(false);
  }

  return (
    <View style={formStyles.formInput}>
      <Pressable onPress={() => setIsOpen(true)}>
        <Text style={formStyles.inputText}>{formatTime(time)}</Text>
      </Pressable>

      <DateTimePickerModal
        isVisible={isOpen}
        mode="time"
        onConfirm={handleChange}
        date={time}
        maximumDate={timeLimit || new Date()}
        onCancel={() => setIsOpen(false)}
      />
    </View>
  );
};

export default TimePicker;
