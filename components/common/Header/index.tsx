import React from 'react';
import { Text, View } from 'react-native';

const Header = ({ title = '', showBackButton = true }) => {
  return (
    <View className="flex-row items-center p-3">
      <Text className="text-xl font-bold text-center flex-1">{title}</Text>
    </View>
  );
};

export default Header;
