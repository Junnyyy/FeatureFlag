import { ReactNode } from 'react';

/**
 * Response object from the feature flags API containing flag names as keys
 * and their boolean enabled/disabled states as values.
 */
export interface FlagResponse {
  [flagName: string]: boolean;
}

/**
 * Context type for the FeatureFlagProvider containing user and API configuration.
 */
export interface FeatureFlagContextType {
  /** The unique identifier for the current user */
  userId: string;
  /** The API endpoint URL for fetching feature flags */
  apiUrl: string;
}

/**
 * Props for the FeatureFlagProvider component.
 */
export interface FeatureFlagProviderProps {
  /** Child components that will have access to feature flag context */
  children: ReactNode;
  /** The unique identifier for the current user */
  userId: string;
  /** The API endpoint URL for fetching feature flags (defaults to '/api/flags') */
  apiUrl?: string;
}

/**
 * @deprecated This interface is maintained for backwards compatibility.
 * Use UseFeatureFlagsResult instead for new code.
 * 
 * Result object from the legacy useFeatureFlag hook.
 */
export interface UseFeatureFlagResult {
  /** Whether the specific flag is enabled */
  isEnabled: boolean;
  /** Whether the flags are currently being loaded */
  isLoading: boolean;
  /** Whether there was an error loading the flags */
  isError: boolean;
  /** The error object if there was an error, null otherwise */
  error: Error | null;
}