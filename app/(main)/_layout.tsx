import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';

export default function DrawerWithTabsLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: '#f4f4f4',
          width: 240,
        },
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
        },
        drawerActiveBackgroundColor: '#ddd',
        drawerActiveTintColor: '#007aff',
        drawerInactiveTintColor: '#555',
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
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
        }}
      />

      <Drawer.Screen
        name="employee/index"
        options={{
          headerTitle: 'Employee',
          drawerLabel: 'Employee',
          drawerIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
      <Drawer.Screen
        name="logout/index"
        options={{
          headerTitle: 'Logout',
          drawerLabel: 'Logout',
          drawerIcon: ({ color }) => <Ionicons name="log-out-outline" size={24} color={color} />,
        }}
      />
    </Drawer>
  );
}
