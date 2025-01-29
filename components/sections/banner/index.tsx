import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { colors } from '@/theme';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.95; // 75% of screen width
const SIDE_ITEM_WIDTH = (width - ITEM_WIDTH) / 3; // Ensures side items are partially visible

const ShoppingBanners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const bannerData = [
    { text: 'Shopping is a form of self-care!', image: require('@/assets/images/shopping1.png') },
    { text: 'Life is short, buy the shoes!', image: require('@/assets/images/shopping2.png') },
    {
      text: 'Happniess can buy new clothes!',
      image: require('@/assets/images/shopping3.png'),
    },
    { text: 'You deserve a shopping spree!', image: require('@/assets/images/shopping1.png') },
    { text: 'Treat yourself, buy that bag!', image: require('@/assets/images/shopping2.png') },
    {
      text: 'Good things come to those who shop!',
      image: require('@/assets/images/shopping3.png'),
    },
  ];

  const handleScroll = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < bannerData.length - 1) {
      handleScroll(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleScroll(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Left Navigation Button */}
      <TouchableOpacity
        style={[styles.navButton, styles.leftButton]}
        onPress={handlePrev}
        disabled={currentIndex === 0}>
        <Text style={styles.navText}>{'<'}</Text>
      </TouchableOpacity>

      {/* Banner List */}
      <FlatList
        ref={flatListRef}
        data={bannerData}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        pagingEnabled
        contentContainerStyle={{ paddingHorizontal: SIDE_ITEM_WIDTH }} // Ensures partial visibility
        renderItem={({ item }) => (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>{item.text}</Text>
            <Image source={item.image} style={styles.bannerImage} resizeMode="contain" />
          </View>
        )}
      />

      {/* Right Navigation Button */}
      <TouchableOpacity
        style={[styles.navButton, styles.rightButton]}
        onPress={handleNext}
        disabled={currentIndex === bannerData.length - 1}>
        <Text style={styles.navText}>{'>'}</Text>
      </TouchableOpacity>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {bannerData.map((_, index) => (
          <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 150,
    position: 'relative',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -15 }], // Center the button vertically
    zIndex: 2,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 20,
    shadowColor: colors.blackGray,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
  },
  leftButton: {
    left: 2,
  },
  rightButton: {
    right: 2,
  },
  navText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  banner: {
    width: ITEM_WIDTH,
    height: 120,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bannerText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  bannerImage: {
    width: 80,
    height: 80,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: colors.lightBlue,
    width: 10,
    height: 10,
  },
});

export default ShoppingBanners;
