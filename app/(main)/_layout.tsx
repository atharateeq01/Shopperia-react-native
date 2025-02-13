import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

import { CustomDrawerContent } from '@/components/layouts/DrawerContents';

export default function DrawerWithTabsLayout() {
  return (
    <Drawer
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#ffffff',
          width: 280,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
          color: '#333',
        },
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="home"
        options={{
          headerTitle: 'Shopperia',
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="cart/index"
        options={{
          headerTitle: 'Cart',
          drawerLabel: 'Cart',
          drawerIcon: ({ color }) => <Ionicons name="cart-outline" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="order/index"
        options={{
          headerTitle: 'Order',
          drawerLabel: 'Order',
          drawerIcon: ({ color }) => <Ionicons name="bag-check-outline" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="logout/index"
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer>
  );
}
