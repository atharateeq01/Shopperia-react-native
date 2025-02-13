import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';

import { Button } from '@/components/common/button';

export const SessionExpired = () => {
  return (
    <View className="flex-1 justify-center items-center bg-lightGrayPurple px-4">
      <Stack.Screen options={{ title: 'Session Expired' }} />

      {/* Placeholder Image */}
      <Image
        source={require('@/assets/images/sessionExpired.png')}
        className="w-40 h-40 mb-6"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-3xl font-bold text-center mb-4">Your session has expired</Text>
      <Text className="text-lg text-center mb-6">Please log in again to continue.</Text>

      {/* Login Button */}
      <Button
        onPress={() => router.replace('/')}
        buttonText="Log In Again"
        variant="primary"
        iconRight={<Ionicons name="log-in-outline" size={20} color="#fff" />}
      />
    </View>
  );
};
