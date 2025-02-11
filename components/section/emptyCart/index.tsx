import { Button } from '@/components/common/Button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, Image } from 'react-native';

interface IEmptyPage {
  textMessage: string;
  isCart: boolean;
}

export const EmptyCart = ({ textMessage, isCart = true }: IEmptyPage) => {
  return (
    <View className="flex-1 justify-center items-center bg-lightGrayPurple px-4">
      {/* Placeholder Image */}
      {isCart ? (
        <Image source={require('@/assets/images/empty-cart.png')} className="w-50 h-50" />
      ) : (
        <Image source={require('@/assets/images/emptry-order.png')} className="w-50 h-50" />
      )}

      {/* Title */}
      <Text className="text-3xl font-bold text-center mb-4">{textMessage}</Text>

      <Button
        onPress={() => router.back()}
        buttonText="Go Back"
        variant="primary"
        iconRight={<Ionicons name="arrow-back-circle-outline" size={20} color="#fff" />}
      />
    </View>
  );
};
