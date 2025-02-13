import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="products/index" />
      <Stack.Screen name="home/index" />
      <Stack.Screen name="product-details/[id]" />
      <Stack.Screen name="categories/index" />
      <Stack.Screen name="productsByCategory/[id]" />
    </Stack>
  );
}
