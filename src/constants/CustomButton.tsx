import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import Colors from './Colors';

const CustomButton = ({
  loading = false,
  disabled = false,
  title,
  onPress,
  textStyle,
  viewStyle,
  LeftIcon,
  RightIcon,
}: {
  title?: string;
  onPress: Function;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  LeftIcon?: JSX.Element;
  RightIcon?: JSX.Element;
}) => {
  const onButtonPress = () => {
    onPress();
  };

  return (
    <Pressable
      disabled={disabled || loading}
      style={[
        styles.buttonConatiner,
        viewStyle,
        disabled && styles.disabled,
        loading && styles.opacity,
      ]}
      onPress={onButtonPress}>
      {loading ? (
        <ActivityIndicator color={Colors.light.background} />
      ) : (
        <>
          {LeftIcon}
          {title && (
            <Text style={[textStyle, disabled && styles.disabledText]}>
              {title}
            </Text>
          )}
          {RightIcon}
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonConatiner: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
  },
  disabled: {
    backgroundColor: Colors.placeholder,
    borderColor: Colors.placeholder,
  },
  disabledText: {
    color: Colors.light.background,
  },
  opacity: {
    opacity: 0.5,
  },
});

export {CustomButton};
