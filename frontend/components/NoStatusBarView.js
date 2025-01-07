import React from 'react';
import { StatusBar, KeyboardAvoidingView, ScrollView, Platform, StyleSheet  } from 'react-native';
import { formStyles } from '../styles/formStyles';

const NoStatusBarView = ({children, padding=0, extraStyle = {}}) => {
  return (
    <KeyboardAvoidingView
      style={[formStyles.container, { padding }, extraStyle]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar hidden={true} />
      <ScrollView>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NoStatusBarView;