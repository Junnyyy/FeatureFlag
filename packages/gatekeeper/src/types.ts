import { ReactNode } from 'react';

export interface FlagResponse {
  [flagName: string]: boolean;
}

export interface FeatureFlagContextType {
  userId: string;
  apiUrl: string;
}

export interface FeatureFlagProviderProps {
  children: ReactNode;
  userId: string;
  apiUrl?: string;
}

export interface UseFeatureFlagResult {
  isEnabled: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}