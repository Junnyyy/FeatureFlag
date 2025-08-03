# Feature Flag Demo App

Interactive Next.js application showcasing the @feature-flag/gatekeeper library in action.

## Features

- Interactive table with animated column show/hide based on feature flags
- User switching to demonstrate different flag states
- Real-time API integration with smooth UX transitions

## Getting Started

From the project root:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

## How It Works

The demo shows a stock data table where the "Market Cap" and "Volume" columns are controlled by the `showExtendedColumns` feature flag:

- **User 123**: Flag is OFF (columns hidden)
- **User 122**: Flag is ON (columns visible)

Toggle between users with the switch to see flags update in real-time.

## Architecture

### API Endpoint

- `GET /api/flags?userId=user-123` returns feature flag values
- User-based logic: even user IDs enable flags, odd user IDs disable them
- 60-second cache headers for performance

### Components

- Uses `useFeatureFlags` hook from @feature-flag/gatekeeper
- `Toggle` component for conditional table captions
- Smooth CSS transitions for flag state changes

### Tech Stack

- Next.js 15 with App Router and Turbopack
- React 19 with latest features
- @feature-flag/gatekeeper for flag management
- Tailwind CSS for styling
- Radix UI for accessible components
