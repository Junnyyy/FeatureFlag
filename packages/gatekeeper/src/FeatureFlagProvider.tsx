import React, { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FeatureFlagProviderProps, FeatureFlagContextType } from './types';

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({
  children,
  userId,
  apiUrl = '/api/flags',
}) => {
  const contextValue = {
    userId,
    apiUrl,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <FeatureFlagContext.Provider value={contextValue}>
        {children}
      </FeatureFlagContext.Provider>
    </QueryClientProvider>
  );
};

export const useFeatureFlagContext = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlagContext must be used within a FeatureFlagProvider');
  }
  return context;
};