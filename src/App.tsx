import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from 'navigations/StackNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
