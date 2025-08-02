# GateKeeper - Feature Flag Components

Performance-optimized React components and hooks for feature flag management.

## Components

### Gate

Conditionally renders children based on a feature flag. Includes error boundary protection.

```tsx
import { Gate } from '@feature-flag/gatekeeper';

<Gate flag="newFeature">
  <NewFeatureComponent />
</Gate>
```

### Toggle

Renders either children (when flag is enabled) or fallback (when flag is disabled). Perfect for A/B testing or toggling between two different implementations.

```tsx
import { Toggle } from '@feature-flag/gatekeeper';

<Toggle 
  flag="darkMode" 
  fallback={<LightModeComponent />}
>
  <DarkModeComponent />
</Toggle>
```

## Hooks

### useFeatureFlags

Get one or more feature flags efficiently with selective re-rendering.

```tsx
// Single flag
const { flags } = useFeatureFlags({ flags: ['myFlag'] });
const isEnabled = flags.myFlag;

// Multiple flags
const { flags, isLoading } = useFeatureFlags({ 
  flags: ['flag1', 'flag2', 'flag3'] 
});
```

### createUseFlags (Typed)

Create a typed hook for your specific feature flags.

```tsx
const FEATURE_FLAGS = ['newHeader', 'darkMode', 'advancedSearch'] as const;
const useAppFlags = createUseFlags(FEATURE_FLAGS);

// Usage
const { flags } = useAppFlags(); // flags is typed!
```

## Performance Features

- **Selective Subscriptions**: Only re-render when subscribed flags change
- **Memoized Components**: React.memo prevents unnecessary re-renders
- **Error Boundaries**: Components that crash won't affect the rest of your app
- **Shared Cache**: All hooks share the same React Query cache

## Setup

```tsx
import { FeatureFlagProvider } from '@feature-flag/gatekeeper';

function App() {
  return (
    <FeatureFlagProvider userId="user-123" apiUrl="/api/flags">
      <YourApp />
    </FeatureFlagProvider>
  );
}
```