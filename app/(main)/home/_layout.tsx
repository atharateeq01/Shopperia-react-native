import Header from '@/components/common/Header';
import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#bbdefb',
        },
        headerTitleAlign: 'center',
        headerBackTitle: 'Go Back',
        headerBlurEffect: 'extraLight',
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <Header title="Dashboard" />,
        }}
      />
      <Stack.Screen
        name="products/index"
        options={{
          headerTitle: () => <Header title="Products" />,
        }}
      />
      <Stack.Screen
        name="product-details/[id]"
        options={{
          headerTitle: () => <Header title="Product details" />,
        }}
      />
      <Stack.Screen
        name="categories/index"
        options={{
          headerTitle: () => <Header title="Categories" />,
        }}
      />
      <Stack.Screen
        name="productsByCategory/[id]"
        options={{
          headerTitle: () => <Header title="Products" />,
        }}
      />
      <Stack.Screen
        name="cart/index"
        options={{
          headerTitle: () => <Header title="Cart" />,
        }}
      />
    </Stack>
  );
}
