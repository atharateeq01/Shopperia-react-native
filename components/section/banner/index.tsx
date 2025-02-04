import { images } from '@/theme';
import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.95; // Adjust item width
const SIDE_ITEM_WIDTH = (width - ITEM_WIDTH) / 2; // Ensure side items are visible

export const ShoppingBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Start from the first item
  const flatListRef = useRef<FlatList>(null);

  const bannerData = [
    { text: 'Shopping is a form of self-care!', image: images.shopping1 },
    { text: 'Life is short, buy the shoes!', image: images.shopping2 },
    { text: 'Happiness can buy new clothes!', image: images.shopping3 },
    { text: 'You deserve a shopping spree!', image: images.shopping1 },
    { text: 'Treat yourself, buy that bag!', image: images.shopping2 },
    {
      text: 'Good things come to those who shop!',
      image: images.shopping3,
    },
  ];

  // Scroll to the given index
  const handleScroll = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  // Move to the next banner
  const handleNext = () => {
    if (currentIndex < bannerData.length - 1) {
      const nextIndex = currentIndex + 1;
      handleScroll(nextIndex);
    }
  };

  // Move to the previous banner
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      handleScroll(prevIndex);
    }
  };

  return (
    <View className="relative flex items-center justify-center w-full h-48">
      {/* FlatList */}
      <FlatList
        ref={flatListRef}
        data={bannerData}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={ITEM_WIDTH + 20} // Ensure snapping to items
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SIDE_ITEM_WIDTH }}
        onMomentumScrollEnd={event => {
          const index = Math.round(event.nativeEvent.contentOffset.x / (ITEM_WIDTH + 20));
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View
            className="flex items-center justify-center rounded-lg shadow-md m-2"
            style={{
              width: ITEM_WIDTH,
              marginHorizontal: 10,
            }}>
            <Image source={item.image} className="w-full h-32 rounded-md" />
            <Text className="text-center font-semibold text-black mt-2">{item.text}</Text>
          </View>
        )}
      />

      {/* Left Button */}
      {currentIndex > 0 && (
        <TouchableOpacity
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          onPress={handlePrev}>
          <Text className="text-xl font-bold text-black">{'<'}</Text>
        </TouchableOpacity>
      )}

      {/* Right Button */}
      {currentIndex < bannerData.length - 1 && (
        <TouchableOpacity
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md"
          onPress={handleNext}>
          <Text className="text-xl font-bold text-black">{'>'}</Text>
        </TouchableOpacity>
      )}

      {/* Dots Indicator */}
      <View className="absolute bottom-[-2] flex-row">
        {bannerData.map((_, index) => (
          <View
            key={index}
            className={`w-2.5 h-2.5 rounded-full mx-1 ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-400'
            }`}
          />
        ))}
      </View>
    </View>
  );
};
