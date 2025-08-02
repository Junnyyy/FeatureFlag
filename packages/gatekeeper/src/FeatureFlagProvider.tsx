import React, { createContext, useContext } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import type { FeatureFlagProviderProps, FeatureFlagContextType } from './types';

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  key: 'FEATURE_FLAGS_CACHE',
  throttleTime: 1000,
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
    <PersistQueryClientProvider 
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <FeatureFlagContext.Provider value={contextValue}>
        {children}
      </FeatureFlagContext.Provider>
    </PersistQueryClientProvider>
  );
};

export const useFeatureFlagContext = () => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('useFeatureFlagContext must be used within a FeatureFlagProvider');
  }
  return context;
};