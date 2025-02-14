import { router, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';

import { Button } from '@/components/common/Button';

export const NotFound = () => {
  return (
    <View className="flex-1 justify-center items-center bg-lightGrayPurple px-4">
      <Stack.Screen options={{ title: 'Oops!' }} />

      {/* Placeholder Image */}
      <Image
        source={require('@/assets/images/notFound.png')}
        className="w-40 h-40 mb-6"
        resizeMode="contain"
      />

      {/* Title */}
      <Text className="text-3xl font-bold text-center mb-4">Page Not Found</Text>

      <Button
        onPress={() => router.back()}
        buttonText="Go Back"
        variant="primary"
        iconRight={<Ionicons name="arrow-back-circle-outline" size={20} color="#fff" />}
      />
    </View>
  );
};
