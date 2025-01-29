import { Fragment } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Provider from '@/providers';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

function Router() {
  return (
    <Fragment>
      <Slot />
      <StatusBar style="light" />
    </Fragment>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router />
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}
