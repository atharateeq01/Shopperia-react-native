import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, Modal, Animated, Keyboard } from 'react-native';

import { Button } from '@/components/common/button';
import { FilterOption } from '@/components/common/filterOption';
import type { IFilterState, OrderDate, OrderStatus } from '@/utils/interface';

interface IOrderFilterModalProps {
  filter: IFilterState;
  filterModalVisible: boolean;
  setFilter: React.Dispatch<React.SetStateAction<IFilterState>>;
  setFilterModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OrderFilterModal: React.FC<IOrderFilterModalProps> = ({
  filter,
  filterModalVisible,
  setFilter,
  setFilterModalVisible,
}) => {
  const [animation] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: filterModalVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [filterModalVisible, animation]);

  const handleApplyFilters = () => {
    Keyboard.dismiss();
    setFilterModalVisible(false);
  };

  const handleClearFilters = () => {
    setFilter({
      statusFilter: null,
      dateFilter: null,
      amountFilter: '',
      orderName: '',
    });
    setFilterModalVisible(false);
  };

  const modalTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal
      visible={filterModalVisible}
      animationType="fade"
      transparent
      statusBarTranslucent
      onRequestClose={() => setFilterModalVisible(false)}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setFilterModalVisible(false)}
        className="flex-1 justify-end bg-black/50">
        <Animated.View
          className="bg-white rounded-t-3xl p-6 w-full"
          style={{ transform: [{ translateY: modalTranslateY }] }}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-800">Filter Orders</Text>
            <TouchableOpacity
              onPress={() => setFilterModalVisible(false)}
              accessibilityLabel="Close filter modal">
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center mb-4 bg-white rounded-full shadow-sm">
            <Ionicons name="search" size={24} color="gray" style={{ marginLeft: 12 }} />
            <TextInput
              className="flex-1 p-3 pl-2"
              placeholderTextColor="gray"
              value={filter.amountFilter}
              onChangeText={text => setFilter({ ...filter, amountFilter: text })}
              placeholder="Search amount"
            />
          </View>

          <Text className="text-lg font-semibold text-gray-700 my-4">Order Status</Text>
          <View className="flex-row justify-between mb-4 pb-5 border-b border-gray-300">
            {['Delivered', 'Processing', 'Cancelled'].map(status => (
              <FilterOption
                key={status}
                label={status}
                isSelected={filter.statusFilter === status}
                onPress={() =>
                  setFilter({
                    ...filter,
                    statusFilter: filter.statusFilter === status ? null : (status as OrderStatus),
                  })
                }
              />
            ))}
          </View>

          <Text className="text-lg font-semibold text-gray-700 my-4">Order Date</Text>
          <View className="flex-row justify-between mb-6  pb-5 border-b border-gray-300">
            {['A day ago', 'A week ago', 'A month ago'].map(date => (
              <FilterOption
                key={date}
                label={date}
                isSelected={filter.dateFilter === date}
                onPress={() =>
                  setFilter({
                    ...filter,
                    dateFilter: filter.dateFilter === date ? null : (date as OrderDate),
                  })
                }
              />
            ))}
          </View>

          <View className="flex-row justify-between items-center mb-5">
            <Button buttonText="Apply Filters" onPress={handleApplyFilters} />
            <Button buttonText="Clear Filters" onPress={handleClearFilters} variant="secondary" />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};
