import React, { ReactNode, ErrorInfo, useMemo } from 'react';
import { useFeatureFlags } from '../hooks/useFeatureFlags';
import { GateErrorBoundary } from './Gate';

export interface ToggleProps {
  /** The name of the feature flag to check */
  flag: string;
  /** Child components to render when the flag is enabled */
  children: ReactNode;
  /** Component to render when the flag is disabled (defaults to null) */
  fallback?: ReactNode;
  /** Optional callback called when child components throw an error */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Toggle component that conditionally renders children or fallback based on a feature flag value.
 * Unlike Gate, Toggle provides a fallback component for when the flag is disabled.
 * During loading, nothing is rendered (null).
 * Includes error boundary protection for enabled components.
 * 
 * Performance optimized with React.memo to prevent unnecessary re-renders when unrelated
 * flags change.
 * 
 * @example
 * ```tsx
 * // Basic toggle between two components
 * <Toggle 
 *   flag="darkMode" 
 *   fallback={<LightModeComponent />}
 * >
 *   <DarkModeComponent />
 * </Toggle>
 * 
 * // Toggle between new and old UI
 * <Toggle 
 *   flag="newDashboard" 
 *   fallback={<OldDashboard />}
 * >
 *   <NewDashboard />
 * </Toggle>
 * 
 * // Toggle with error handling
 * <Toggle 
 *   flag="experimentalSearch"
 *   fallback={<BasicSearch />}
 *   onError={(error, info) => reportError(error, info)}
 * >
 *   <AdvancedSearch />
 * </Toggle>
 * ```
 */
export const Toggle: React.FC<ToggleProps> = React.memo(({ 
  flag, 
  children, 
  fallback = null, 
  onError 
}) => {
  const flagArray = useMemo(() => [flag], [flag]);
  const { flags, isLoading } = useFeatureFlags({ flags: flagArray });

  if (isLoading) {
    return null;
  }

  if (flags[flag]) {
    return (
      <GateErrorBoundary onError={onError}>
        {children}
      </GateErrorBoundary>
    );
  }

  return fallback;
});

Toggle.displayName = 'Toggle';