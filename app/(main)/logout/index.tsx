import { useDataPersist } from '@/hooks';
import { useAppSlice } from '@/slices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Logout() {
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
}
