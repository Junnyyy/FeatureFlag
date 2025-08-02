import React from 'react';
import { 
  FeatureFlagProvider, 
  Gate, 
  Toggle, 
  useFeatureFlags,
  createUseFlags 
} from '../index';

const FEATURE_FLAGS = ['newHeader', 'darkMode', 'advancedSearch'] as const;
const useAppFlags = createUseFlags(FEATURE_FLAGS);

const ExampleComponent: React.FC = () => {
  const { flags: singleFlag } = useFeatureFlags({ flags: ['newHeader'] });
  const { flags } = useFeatureFlags({ flags: ['darkMode', 'advancedSearch'] });
  const { flags: typedFlags } = useAppFlags();

  return (
    <div>
      <h1>Feature Flag Examples</h1>
      
      <p>Single flag check: New header is {singleFlag.newHeader ? 'enabled' : 'disabled'}</p>
      
      <p>Multiple flags: Dark mode is {flags.darkMode ? 'on' : 'off'}</p>
      
      <p>Typed flags: Advanced search is {typedFlags.advancedSearch ? 'available' : 'unavailable'}</p>

      <Gate flag="newHeader">
        <div>
          <h2>New Header Component</h2>
          <p>This only shows when the newHeader flag is enabled</p>
        </div>
      </Gate>

      <Toggle 
        flag="darkMode" 
        fallback={<div>Light mode interface</div>}
      >
        <div style={{ backgroundColor: '#333', color: 'white', padding: '10px' }}>
          Dark mode interface
        </div>
      </Toggle>

      <Toggle 
        flag="advancedSearch"
        fallback={<input type="text" placeholder="Basic search..." />}
      >
        <div>
          <input type="text" placeholder="Advanced search with filters..." />
          <button>Filter</button>
          <button>Sort</button>
        </div>
      </Toggle>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <FeatureFlagProvider userId="user-123" apiUrl="/api/flags">
      <ExampleComponent />
    </FeatureFlagProvider>
  );
};

export default App;