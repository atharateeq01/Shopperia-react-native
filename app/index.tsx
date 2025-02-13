import { useEffect, useState } from 'react';
import { SplashScreen, router } from 'expo-router';
import { getToken } from '@/api';
import { useAppSlice } from '@/slices/app.slice';
import { DataPersistKeys, useDataPersist } from '@/hooks';
import { IUserData } from '@/utils/interface';
import { loadImages } from '@/theme/images';
export default function Layout() {
  const { dispatch, setUser, setLoggedIn } = useAppSlice();
  const { getPersistData } = useDataPersist();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function preload() {
      try {
        await Promise.all([loadImages()]);
        const token = await getToken();
        // Check if user is logged in or token exists
        if (token) {
          const user: IUserData = await getPersistData(DataPersistKeys.USER);
          dispatch(setUser(user));
          dispatch(setLoggedIn(!!user));
          router.replace('(main)/(home)/dashboard');
        } else {
          // Otherwise, stay in the auth flow
          router.replace('(auth)/login');
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

  return null;
}
