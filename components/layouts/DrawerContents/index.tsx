import { router } from 'expo-router';
import { View, Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { getInitials } from '@/utils/helper';
import { useAppSlice } from '@/slices/app.slice';

export const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { user } = useAppSlice();
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: '#bbdefb' }}>
      <View className="flex-row justify-around items-center py-5 mb-2 border-b border-gray-500 rounded-r-lg">
        {/* Circle with initials */}
        <View className="w-20 h-20 bg-blue-400 rounded-full justify-center items-center mb-3">
          <Text className="text-white text-3xl font-bold">
            {getInitials(user?.firstName, user?.lastName)}
          </Text>
        </View>

        <View>
          <Text className="text-gray-1000 text-xl font-bold">{`${user?.firstName} ${user?.lastName}`}</Text>
          <Text className="text-gray-600 text-lg">{user?.email}</Text>
        </View>
      </View>

      <View className="flex-1">
        <DrawerItemList {...props} />
      </View>

      {/* Logout at bottom */}
      <View className="border-t border-gray-500 mt-auto">
        <DrawerItem
          label="Logout"
          labelStyle={{ fontSize: 16, fontWeight: '500', color: '#333' }}
          icon={({ color }) => <Ionicons name="log-out-outline" size={24} color={color} />}
          onPress={() => router.push('(main)/logout')}
        />
      </View>
    </DrawerContentScrollView>
  );
};
