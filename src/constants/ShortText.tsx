import { View, Text, StyleSheet, TextStyle } from 'react-native';
import React, { ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import Text_Size from './textScaling';

const ShortText = (props: {
  children?: ReactNode;
  textStyle?: TextStyle;
  text: string | number | undefined;
  numberOfLines?: number;
  ellipsizeMode?: any;
}) => {
  const { colors } = useTheme();
  return (
    <View>
      <Text
        allowFontScaling={false}
        ellipsizeMode={props.ellipsizeMode}
        numberOfLines={props.numberOfLines}
        style={[
          styles.details,
          { color: colors.lightText },
          { ...props.textStyle },
        ]}>
        {props.text}
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  details: {
    fontSize: Text_Size.Text_8,
    fontFamily: 'Muli',
  },
});

export default ShortText;