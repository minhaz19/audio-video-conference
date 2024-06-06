import { Text, StyleSheet, TextStyle } from 'react-native';
import React from 'react';
import Text_Size from './textScaling';
import { useTheme } from '../hooks/useTheme';

const TitleText = (props: {
  text: string | number;
  textStyle?: TextStyle;
  ellipsizeMode?: any;
  numberOfLines?: number;
}) => {
  const { colors } = useTheme();
  return (
    <Text
      allowFontScaling={false}
      ellipsizeMode={props.ellipsizeMode}
      numberOfLines={props.numberOfLines}
      style={[styles.title, { color: colors.headerText }, { ...props.textStyle }]}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_9,
    fontFamily: 'Muli',
  },
});

export default TitleText;