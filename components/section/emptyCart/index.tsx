import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';

import { images } from '@/theme/images';
import { Button } from '@/components/common/Button';

interface IEmptyPage {
  textMessage: string;
  isCart: boolean;
}

export const EmptyCart = ({ textMessage, isCart = true }: IEmptyPage) => {
  return (
    <View className="flex-1 justify-center items-center bg-lightGrayPurple pb-4">
      {/* Placeholder Image */}
      <Image source={isCart ? images.emptyCart : images.emptyOrder} className={'w-full h-5/6'} />

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
