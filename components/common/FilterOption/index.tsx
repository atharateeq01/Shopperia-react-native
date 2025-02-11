import type React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface FilterOptionProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const FilterOption: React.FC<FilterOptionProps> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 rounded-lg ${isSelected ? 'bg-blue-500' : 'bg-gray-200'}`}
    accessibilityState={{ selected: isSelected }}
    accessibilityLabel={`${label} filter option`}>
    <Text className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
      {label}
    </Text>
  </TouchableOpacity>
);
