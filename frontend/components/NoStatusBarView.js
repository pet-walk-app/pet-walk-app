import React from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { formStyles } from '../styles/formStyles';

const NoStatusBarView = ({children, padding=0, extraStyle = {}}) => {
  return (
    <KeyboardAvoidingView style={[formStyles.container, padding={padding}, extraStyle]}>
      <StatusBar hidden={true} />
      {children}
    </KeyboardAvoidingView>
  );
};

export default NoStatusBarView;