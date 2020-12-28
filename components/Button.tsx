import React from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';

import {colors} from '../colors';

interface Props {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}

const Button: React.FunctionComponent<Props> = ({title, onPress, style}) => (
  <TouchableOpacity style={{...styles.button, ...style}} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkCharlie,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    minWidth: 60,
  },
  buttonText: {
    color: colors.darkAlpha,
  },
});

export default Button;
