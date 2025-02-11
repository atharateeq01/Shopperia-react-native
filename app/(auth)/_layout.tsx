import React, { useEffect, useState } from 'react';
import { SplashScreen, Stack, router } from 'expo-router';
import { getToken } from '@/api';
import { useAppSlice } from '@/slices';
import Header from '@/components/common/Header';
import { DataPersistKeys, useDataPersist } from '@/hooks';
import { IUserData } from '@/utils/interface';

SplashScreen.preventAutoHideAsync();

const AuthLayout = () => {
  const { dispatch, setUser, setLoggedIn } = useAppSlice();
  const { getPersistData } = useDataPersist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function preload() {
      try {
        const token = await getToken();
        // Check if user is logged in or token exists
        if (token) {
          const user: IUserData = await getPersistData(DataPersistKeys.USER);
          dispatch(setUser(user));
          dispatch(setLoggedIn(!!user));
          router.push('/(main)');
        } else {
          // Otherwise, stay in the auth flow
          setLoading(false);
          SplashScreen.hideAsync();
        }
      } catch (error) {
        console.error(error);
      }
    }
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    SplashScreen.hideAsync();
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
      <Stack.Screen
        name="sessionExpired/index"
        options={{
          headerShown: false,
          headerTitle: () => <Header title="Sign up" />,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
