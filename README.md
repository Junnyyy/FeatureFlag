# Feature Flag Demo

A comprehensive demonstration of a self-built feature flag system showcasing both the library implementation and a real-world application example.

https://github.com/user-attachments/assets/d9619822-0ded-42bd-8e90-d105eb7f1a4c

## What is this?

This project demonstrates a complete feature flag solution with:

- **@feature-flag/gatekeeper**: A custom React library for managing feature flags with hooks, components, and caching
- **Interactive Demo App**: A clean web application showing feature flags in action with animated UI transitions
- **API Integration**: Backend endpoint for flag management with user-based logic

## Quick Start

```sh
# Install dependencies
pnpm install

# Start the demo
pnpm dev

# Visit http://localhost:3000 to see the demo
```

## Project Structure

### Apps and Packages

- **`apps/web`**: Next.js demo application showcasing the feature flag system
  - Interactive table with animated column show/hide
  - User switching to demonstrate different flag states
  - Clean OpenAI-inspired design
  - API integration with real-time updates

- **`packages/gatekeeper`**: Feature flag React library
  - `useFeatureFlags` hook for flag subscription
  - `Gate` and `Toggle` components for conditional rendering
  - React Query integration for caching and performance
  - TypeScript support with full type safety

### Key Features

- **Real-time Updates**: Flags update immediately when changed
- **Performance Optimized**: Smart caching with React Query
- **Type Safe**: Full TypeScript support throughout
- **User-based Logic**: Different users can have different flag states
- **Smooth Animations**: CSS transitions for polished UX

## How It Works

### Demo Application

1. **User Toggle**: Switch between different users to see varying flag states
2. **Dynamic UI**: Table columns animate in/out based on feature flags
3. **Real-time API**: Flags are fetched from `/api/flags` with user-specific logic
4. **Smart Caching**: React Query optimizes API calls and provides smooth UX

### Library Architecture

The gatekeeper library provides:

```jsx
// Hook-based usage
const { flags, isLoading } = useFeatureFlags({ 
  flags: ['newFeature', 'darkMode'] 
});

// Component-based usage
<Gate flag="newFeature">
  <NewFeatureComponent />
</Gate>

<Toggle flag="darkMode" fallback={<LightTheme />}>
  <DarkTheme />
</Toggle>
```

### API Structure

```
GET /api/flags?userId=user-123
{
  "showExtendedColumns": true,
  "newFeature": false
}
```

## Development

```sh
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build everything
pnpm build

# Run linting
pnpm lint
```

## Tech Stack

- **Next.js 15**: App router with API routes
- **React 19**: Latest React features
- **TypeScript**: Full type safety
- **React Query**: Smart caching and state management
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
