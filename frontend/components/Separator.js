import React from 'react';
import { View} from 'react-native';
import { separatorStyles } from '../styles/componentsStyles';

const Separator = ({ height }) => {
  return <View style={[separatorStyles.separator, height={ height }]} />;
};

export default Separator;
