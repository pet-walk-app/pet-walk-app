import React from 'react';
import { View} from 'react-native';
import { separatorStyles } from '../styles.js/componentsStyles';

const Separator = ({ height }) => {
  return <View style={[separatorStyles.separator, height={ height }]} />;
};


export default Separator;
