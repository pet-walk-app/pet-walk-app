import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, Animated, Easing } from 'react-native';
import { formStyles } from '../styles/formStyles';
import { darkGrey } from '../consts/colors';
import { ErrorMessage } from './ErrorMessage';

export default function FormInput({
                                    value,
                                    setValue,
                                    placeholder,
                                    errorMessage,
                                    secureTextEntry = false
                                  }) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabelPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedLabelPosition, {
      toValue: isFocused || value ? 1 : 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: 2,
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
    }),
    top: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 2],
    }),
    color: darkGrey,
  };

  return (
      <View>
          <View style={formStyles.formInput}>
              <View>
                  <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
                  <TextInput
                      style={{ height: '100%', paddingTop: 25 }}
                      value={value}
                      onChangeText={(text) => setValue(text)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      placeholder=""
                      secureTextEntry={secureTextEntry}
                  />
            </View>
        </View>
        <ErrorMessage errorMessage={errorMessage} />
      </View>
  );
}