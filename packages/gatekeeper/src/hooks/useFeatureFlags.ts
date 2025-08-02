import { useFlagSubscription } from './useFlagSubscription';

export interface UseFeatureFlagsOptions {
  /** Array of feature flag names to subscribe to */
  flags: string[];
  /** Whether the query should be enabled (defaults to true) */
  enabled?: boolean;
}

export interface UseFeatureFlagsResult {
  /** Object containing flag names as keys and their boolean values */
  flags: Record<string, boolean>;
  /** Whether the flags are currently being loaded */
  isLoading: boolean;
  /** Whether there was an error loading the flags */
  isError: boolean;
  /** The error object if there was an error, null otherwise */
  error: Error | null;
}

/**
 * Hook to subscribe to one or more feature flags with performance optimization.
 * Only triggers re-renders when the subscribed flags change, ignoring changes
 * to other flags.
 * 
 * @param options Configuration object with flags array and optional enabled flag
 * @returns Object containing flag values, loading state, and error information
 * 
 * @example
 * ```tsx
 * // Single flag
 * const { flags, isLoading } = useFeatureFlags({ flags: ['darkMode'] });
 * const isDarkMode = flags.darkMode;
 * 
 * // Multiple flags
 * const { flags, isLoading, isError } = useFeatureFlags({ 
 *   flags: ['newHeader', 'advancedSearch', 'betaFeatures'] 
 * });
 * 
 * if (isLoading) return <div>Loading...</div>;
 * if (isError) return <div>Error loading flags</div>;
 * 
 * return (
 *   <div>
 *     {flags.newHeader && <NewHeader />}
 *     {flags.advancedSearch && <SearchFilters />}
 *     {flags.betaFeatures && <BetaPanel />}
 *   </div>
 * );
 * ```
 */
export const useFeatureFlags = (options: UseFeatureFlagsOptions): UseFeatureFlagsResult => {
  const { flags: requestedFlags } = options;
  
  return useFlagSubscription(requestedFlags);
};

/**
 * Creates a typed hook for a specific set of feature flags. This provides
 * better TypeScript support and autocomplete for your application's flags.
 * 
 * @param flagNames Readonly array of flag names to create a typed hook for
 * @returns A hook function that returns typed flag results
 * 
 * @example
 * ```tsx
 * // Define your app's feature flags
 * const FEATURE_FLAGS = ['newHeader', 'darkMode', 'advancedSearch'] as const;
 * 
 * // Create a typed hook
 * const useAppFlags = createUseFlags(FEATURE_FLAGS);
 * 
 * // Use in components with full TypeScript support
 * function MyComponent() {
 *   const { flags, isLoading } = useAppFlags();
 *   
 *   // flags.newHeader is typed as boolean
 *   // TypeScript will autocomplete available flag names
 *   return (
 *     <div>
 *       {flags.newHeader && <h1>New Header!</h1>}
 *       {flags.darkMode && <div className="dark-theme">Dark mode active</div>}
 *     </div>
 *   );
 * }
 * ```
 */
export const createUseFlags = <T extends string>(flagNames: readonly T[]) => {
  return (): UseFeatureFlagsResult & { flags: Record<T, boolean> } => {
    return useFeatureFlags({ flags: [...flagNames] }) as UseFeatureFlagsResult & { flags: Record<T, boolean> };
  };
};