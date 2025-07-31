import { useQuery } from '@tanstack/react-query';
import { useFeatureFlagContext } from '../FeatureFlagProvider';
import type { FlagResponse, UseFeatureFlagResult } from '../types';

const fetchFlags = async (apiUrl: string, userId: string): Promise<FlagResponse> => {
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-ID': userId,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch flags: ${response.statusText}`);
  }

  return response.json();
};

export const useFeatureFlag = (flagName: string): UseFeatureFlagResult => {
  const { userId, apiUrl } = useFeatureFlagContext();

  const {
    data: flags,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['flags', userId],
    queryFn: () => fetchFlags(apiUrl, userId),
    refetchInterval: 60 * 1000,
  });

  return {
    isEnabled: flags?.[flagName] ?? false,
    isLoading,
    isError,
    error,
  };
};