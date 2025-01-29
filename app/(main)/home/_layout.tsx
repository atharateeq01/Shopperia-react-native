import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen name="products/index" options={{ title: 'Products' }} />
      <Stack.Screen name="product-details/[id]" options={{ title: 'Product Details' }} />
      <Stack.Screen name="categories/index" options={{ title: 'Categories' }} />
      <Stack.Screen name="productsByCategory/[id]" options={{ title: 'Products' }} />
    </Stack>
  );
}
