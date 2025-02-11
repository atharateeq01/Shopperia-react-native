import moment from 'moment';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAppSlice } from '@/slices';
import { showToast } from '@/utils/toast';
import { getUserInfo, loginUser } from '@/api';
import { DataPersistKeys, useDataPersist } from '@/hooks/useDataPersist';

export const useLoginUser = () => {
  const { dispatch, setUser, setLoggedIn } = useAppSlice();
  const { setPersistData } = useDataPersist();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: async data => {
      if (data.success) {
        const token = data.data;
        const expirationTime = moment().add(1, 'hour').toISOString();
        // Store both the token and expiration time
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('tokenExpiration', expirationTime);
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
      console.log(error);

      showToast('error', 'Opps!', error.message);
    },
  });
};
