import Toast from 'react-native-toast-message';

export const showToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'bottom',
    visibilityTime: 3000, // Duration the toast is visible
    autoHide: true,
    topOffset: 30, // Adjusts the toast position
  });
};
