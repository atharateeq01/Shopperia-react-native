import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack, router } from 'expo-router';
import { getToken } from '@/api';
import { useAppSlice } from '@/slices';
import Header from '@/components/common/Header';

SplashScreen.preventAutoHideAsync();

const AuthLayout = () => {
  const { loggedIn } = useAppSlice();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function preload() {
      try {
        const token = await getToken();
        // Check if user is logged in or token exists
        if (loggedIn || token) {
          // Redirect to main if logged in or token is found
          router.push('/(main)');
        } else {
          // Otherwise, stay in the auth flow
          setLoading(false);
          SplashScreen.hideAsync();
        }
      } catch (error) {
        // Optionally, handle error (e.g., token fetch failed)
        console.error(error);
      }
    }
    preload();
  }, [loggedIn]);

  if (loading) {
    SplashScreen.hideAsync();
    // You can return null or a loading spinner if needed
    return null;
  }
  // If logged out, render auth stack
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
        name="login/index"
        options={{
          headerTitle: () => <Header title="Login" />,
        }}
      />
      <Stack.Screen
        name="signUp/index"
        options={{
          headerTitle: () => <Header title="Sign up" />,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
