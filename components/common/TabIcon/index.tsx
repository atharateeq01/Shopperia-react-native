import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export const TabIcon = ({
  isFocused,
  icon,
  title,
}: {
  isFocused: boolean;
  icon: any;
  title: string;
}) => (
  <View className="flex-2 mt-3 flex flex-col items-center">
    <Ionicons name={icon} size={20} color={isFocused ? 'blue' : 'black'} />
    <Text className={`text-xm w-full text-center mt-1 ${isFocused ? 'text-blue' : 'text-black'}`}>
      {title}
    </Text>
  </View>
);
