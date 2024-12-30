import React, { useState, useEffect, useRef } from 'react';
import { TextInput, View, Animated, Easing, Text } from 'react-native';
import { formStyles } from '../styles/formStyles';
import { darkGrey } from '../consts/colors';

export default function FormBigInput({ 
  value, 
  setValue,
  placeholder,
  height,
  errorMessage,
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
    left: 38,
    
    fontSize: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [15, 12],
    }),
    top: animatedLabelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [17, 2],
    }),
    color: darkGrey,
    zIndex: 1
  };

  return (
    <View>
      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
      <TextInput 
        style={formStyles.formBigInput}
        placeholder=""
        value={value}
        onChangeText={(text) => setValue(text)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        height={height}
        numberOfLines={20}
        multiline={true}
        placeholderTextColor={darkGrey}
      />
      {errorMessage && <Text style={formStyles.errorText}>{errorMessage}</Text>}
    </View>
  );
}
