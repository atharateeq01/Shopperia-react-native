import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
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
        return 'bg-blue-500 text-white';
      case 'secondary':
        return 'bg-gray-200 text-gray-700';
      case 'clear':
        return 'bg-transparent text-blue-500';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const baseButtonStyles = `rounded-md py-3 px-4 flex-row items-center justify-center font-bold`;
  const disabledStyles = isDisabled || isLoading ? 'opacity-50' : '';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled || isLoading}
      className={`${baseButtonStyles} ${getButtonStyles()} ${disabledStyles}`}>
      {iconLeft && !isLoading && <View className="mr-2">{iconLeft}</View>}
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text className={`text-center ${getButtonStyles().split(' ')[1]}`}>{buttonText}</Text>
      )}
      {iconRight && !isLoading && <View className="ml-2">{iconRight}</View>}
    </TouchableOpacity>
  );
};

export default Button;
