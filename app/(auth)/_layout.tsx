import React from 'react';
import { Stack } from 'expo-router';

import Header from '@/components/common/Header';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: () => <Header title="Login" />,
        }}
      />
      <Stack.Screen
        name="signUp"
        options={{
          headerTitle: () => <Header title="Sign up" />,
        }}
      />
      <Stack.Screen
        name="sessionExpired"
        options={{
          headerShown: false,
          headerTitle: () => <Header title="Session expired" />,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
