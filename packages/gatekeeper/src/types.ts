export interface FeatureFlagConfig {
  [key: string]: boolean;
}

export interface FeatureFlagContextValue {
  flags: FeatureFlagConfig;
  isEnabled: (flagName: string) => boolean;
}