import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

interface ButtonProps {
  onPress: (data: any) => void;
  buttonText: string;
  isDisabled?: boolean;
  variant?: 'primary' | 'secondary' | 'clear';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  buttonText,
  isDisabled = false,
  variant = 'primary',
  iconLeft,
  iconRight,
  isLoading = false,
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'clear':
        return styles.clearButton;
      default:
        return styles.primaryButton;
    }
  };

  const disabledStyles = isDisabled || isLoading ? styles.disabled : {};

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled || isLoading}
      style={[styles.button, getButtonStyles(), disabledStyles]}>
      {iconLeft && !isLoading && <View style={styles.iconLeft}>{iconLeft}</View>}
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          style={[
            styles.buttonText,
            getButtonStyles() === styles.clearButton && styles.clearButtonText,
          ]}>
          {buttonText}
        </Text>
      )}
      {iconRight && !isLoading && <View style={styles.iconRight}>{iconRight}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#3b82f6', // blue-500
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: '#e5e7eb', // gray-200
    color: '#374151', // gray-700
  },
  clearButton: {
    backgroundColor: 'transparent',
    color: '#3b82f6', // blue-500
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  clearButtonText: {
    color: '#3b82f6', // blue-500
  },
  disabled: {
    opacity: 0.5,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default Button;
