import React from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { formStyles } from '../styles/formStyles';

const NoStatusBarView = ({children, padding=0}) => {
  return (
    <KeyboardAvoidingView style={[formStyles.container, padding={padding}]}>
      <StatusBar hidden={true} />
      {children}
    </KeyboardAvoidingView>
  );
};

export default NoStatusBarView;