import React, { ReactNode, ErrorInfo, Component, useMemo } from 'react';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Error boundary component that catches JavaScript errors in child components.
 * When an error occurs, it completely removes the component from the DOM to prevent
 * impact on the rest of the application.
 * 
 * @example
 * ```tsx
 * <GateErrorBoundary onError={(error, info) => console.log('Error caught:', error)}>
 *   <MyComponent />
 * </GateErrorBoundary>
 * ```
 */
export class GateErrorBoundary extends Component<
  { 
    /** Child components to render within the error boundary */
    children: ReactNode; 
    /** Optional callback called when an error is caught */
    onError?: (error: Error, errorInfo: ErrorInfo) => void 
  },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; onError?: (error: Error, errorInfo: ErrorInfo) => void }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    console.error('Gate component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export interface GateProps {
  /** The name of the feature flag to check */
  flag: string;
  /** Child components to render when the flag is enabled */
  children: ReactNode;
  /** Optional callback called when child components throw an error */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * Gate component that conditionally renders children based on a feature flag value.
 * Includes error boundary protection that completely removes crashed components from the DOM.
 * 
 * Performance optimized with React.memo to prevent unnecessary re-renders when unrelated
 * flags change.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Gate flag="newFeature">
 *   <NewFeatureComponent />
 * </Gate>
 * 
 * // With error handling
 * <Gate 
 *   flag="experimentalFeature" 
 *   onError={(error, info) => logError(error, info)}
 * >
 *   <ExperimentalComponent />
 * </Gate>
 * ```
 */
export const Gate: React.FC<GateProps> = React.memo(({ flag, children, onError }) => {
  const flagArray = useMemo(() => [flag], [flag]);
  const { flags, isLoading } = useFeatureFlags({ flags: flagArray });

  if (isLoading || !flags[flag]) {
    return null;
  }

  return (
    <GateErrorBoundary onError={onError}>
      {children}
    </GateErrorBoundary>
  );
});

Gate.displayName = 'Gate';