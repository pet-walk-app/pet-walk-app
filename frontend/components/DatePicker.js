import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {formStyles} from '../styles.js/formStyles';
import {formatDate} from '../utils/commonUtils';

const DatePicker = ({date, setDate, pastDate}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View>
            <Pressable
                onPress={() => setIsOpen(true)}
                style={formStyles.formInput}>
                <Text style={formStyles.inputText}>{formatDate(date, '.')}</Text>
            </Pressable>

            <DateTimePickerModal
                isVisible={isOpen}
                mode="date"
                onConfirm={handleChange}
                date={date}
                maximumDate={pastDate && new Date()}
                onCancel={() => setIsOpen(false)}
            />
        </View>
    );
};

export default DatePicker;