import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDataPersist } from '@/hooks';
import { useAppSlice } from '@/slices/app.slice';

export const Logout = () => {
  const { dispatch, reset, setLoggedIn } = useAppSlice();
  const { removeAllPersistData } = useDataPersist();
  useEffect(() => {
    const handleLogout = async () => {
      await removeAllPersistData();
      dispatch(reset());
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('tokenExpiration');
      setLoggedIn(false);
      router.push('/(auth)');
    };

    handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
