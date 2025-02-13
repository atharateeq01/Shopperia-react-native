import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack initialRouteName="dashboard" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="products" />
      <Stack.Screen name="product-details" />
      <Stack.Screen name="categories" />
      <Stack.Screen name="productsByCategory" />
    </Stack>
  );
}
