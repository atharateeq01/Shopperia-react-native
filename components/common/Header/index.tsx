import React from 'react';
import { Text, View } from 'react-native';

const Header = ({ title = '', showBackButton = true }) => {
  return (
    <View className="flex-row items-center bg-blue-200 p-4">
      <Text className="text-xl text-custom-blue font-bold text-center flex-1">{title}</Text>
    </View>
  );
};

export default Header;
