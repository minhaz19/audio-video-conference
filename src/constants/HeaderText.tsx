import { View, Text, StyleSheet, TextStyle } from 'react-native';
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import Text_Size from './textScaling';


const HeaderText = (props: {
  text:
  | boolean
  | React.ReactChild
  | React.ReactFragment
  | React.ReactPortal
  | null
  | undefined;
  textStyle?: TextStyle;
}) => {
  const { colors } = useTheme();
  return (
    <View>
      <Text
        allowFontScaling={false}
        style={[
          styles.title,
          { color: colors.headerText },
          { ...props.textStyle },
        ]}>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Text_Size.Text_1,
    fontWeight: '600',
    fontFamily: 'Muli',
  },
});

export default HeaderText;
