import { getToken } from '@/api';
import { useAppSlice } from '@/slices';
import { router, SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';

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
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Login',
        }}
      />
      <Stack.Screen
        name="authScreen/signUpSection/index"
        options={{
          headerTitle: 'Sign up',
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
