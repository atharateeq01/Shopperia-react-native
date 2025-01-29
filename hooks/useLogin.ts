import { getUserInfo, loginUser } from '@/api';
import { useAppSlice } from '@/slices';
import { showToast } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { DataPersistKeys, useDataPersist } from './useDataPersist';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLoginUser = () => {
  const { dispatch, setUser, setLoggedIn } = useAppSlice();
  const { setPersistData } = useDataPersist();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async data => {
      if (data.success) {
        const token = data.data;
        const expirationTime = Date.now() + 3600000;
        // Store both the token and expiration time
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());
      }
      const response = await getUserInfo();
      if (response.success) {
        // Set user in Redux
        dispatch(setUser(response.data));
        dispatch(setLoggedIn(true));

        // Persist user data
        await setPersistData(DataPersistKeys.USER, response.data);
        router.push('/(main)');
      }
    },
    onError: error => {
      showToast('error', 'Opps!', error.message);
    },
  });
};
