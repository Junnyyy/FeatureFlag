import { useQuery } from '@tanstack/react-query';
import { useMemo, useRef, useCallback } from 'react';
import { useFeatureFlagContext } from '../FeatureFlagProvider';
import type { FlagResponse } from '../types';

/**
 * Fetches feature flags from the API endpoint
 * @param apiUrl The API endpoint URL
 * @param userId The user ID to fetch flags for
 * @returns Promise resolving to flag response object
 */
const fetchFlags = async (apiUrl: string, userId: string): Promise<FlagResponse> => {
  const url = new URL(apiUrl, window.location.origin);
  url.searchParams.set('userId', userId);
  
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch flags: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Internal hook that provides optimized flag subscription with selective re-rendering.
 * Only triggers component updates when the specific subscribed flags change,
 * ignoring changes to other flags for better performance.
 * 
 * @param subscribedFlags Array of flag names to subscribe to
 * @returns Object containing flag values, loading state, and error information
 * 
 * @internal This hook is used internally by useFeatureFlags and should not be used directly
 */
export const useFlagSubscription = (subscribedFlags: string[]) => {
  const { userId, apiUrl } = useFeatureFlagContext();
  const previousFlags = useRef<FlagResponse>({});
  const subscribedSet = useMemo(() => new Set(subscribedFlags), [subscribedFlags]);

  const {
    data: allFlags,
    isLoading,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ['flags', userId],
    queryFn: () => fetchFlags(apiUrl, userId),
    refetchInterval: 60 * 1000,
  });

  const hasRelevantChanges = useCallback((newFlags: FlagResponse | undefined, prevFlags: FlagResponse) => {
    if (!newFlags) return false;
    
    for (const flag of subscribedSet) {
      if (newFlags[flag] !== prevFlags[flag]) {
        return true;
      }
    }
    return false;
  }, [subscribedSet]);

  const relevantFlags = useMemo(() => {
    if (!allFlags) {
      return subscribedFlags.reduce((acc, flag) => ({ ...acc, [flag]: false }), {});
    }

    if (!hasRelevantChanges(allFlags, previousFlags.current)) {
      return previousFlags.current;
    }

    const newRelevantFlags = subscribedFlags.reduce((acc, flag) => ({
      ...acc,
      [flag]: allFlags[flag] ?? false,
    }), {});

    previousFlags.current = newRelevantFlags;
    return newRelevantFlags;
  }, [allFlags, subscribedFlags, hasRelevantChanges]);

  return {
    flags: relevantFlags,
    isLoading: isPending && !allFlags,
    isError,
    error,
  };
};