import { Asset } from 'expo-asset';

export const images: { [key: string]: ReturnType<typeof require> } = {
  logo: require('@/assets/images/logo.svg'),
  logo_lg: require('@/assets/images/logo-lg.png'),
  shopping1: require('@/assets/images/shopping1.png'),
  shopping2: require('@/assets/images/shopping2.png'),
  shopping3: require('@/assets/images/shopping3.png'),
};

// preload images
const preloadImages = () =>
  Object.keys(images).map(key => {
    return Asset.fromModule(images[key] as number).downloadAsync();
  });

export const loadImages = async () => Promise.all(preloadImages());
