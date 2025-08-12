# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Karma's Parallel Universe" is a React + TypeScript + Vite web application that simulates alternate life paths. Users input personal information and past decisions, then AI generates timeline scenarios showing how different choices might have led to different outcomes.

## Development Commands

```bash
# Start development server with hot module reload
npm run dev

# Build the application for production
npm run build

# Run ESLint to check code quality
npm run lint

# Preview production build locally
npm run preview
```

## Application Architecture

### Multi-Step Form Flow
The app uses a wizard-style form with these steps:
1. **IntroStep**: Introduction with Karma dialog system
2. **PersonalInfoStep**: Birth date, gender, location, job, self-description
3. **PastSituationStep**: Year of past decision, choice made, desired change
4. **CompleteStep**: Review and submit, shows LoadingComponent during API call

### State Management (Jotai Atoms)
- `simulationResultAtom`: Stores API response with timeline and final message
- `isLoadingAtom`: Controls loading state during API simulation
- `languageAtom`: Current language selection with localStorage persistence
- `setLanguageAtom`: Write-only atom for language changes

### Key Data Types
```typescript
interface UniverseFormData {
  birthDate: string;
  gender: "male" | "female";
  currentLocation: string;
  currentJob: string;
  currentSelf: string;
  year: number;
  pastChoice: string;
  desiredChange: string;
}

interface SimulationResult {
  timeline: TimelineItem[];
  lastMessage: string;
}
```

### Dialog System
Custom Karma dialog component with:
- Typewriter text animation
- Auto-advance mode for loading screens
- Manual click-to-continue for interactive dialogs
- Support for multi-line messages with `\n\n`

### Routing and Layout
- Single-page app with nested routes under Layout component
- Home page contains the multi-step form
- ResultPage displays simulation results with timeline navigation
- LoadingComponent shows during API calls (not a separate route)

### Language Support
Prepared for internationalization with 5 languages:
- Korean (default), English, Japanese, Chinese, Italian
- Language selection persisted in localStorage
- Settings available on intro screen alongside "skip greeting" option

### Styling Architecture
- Styled Components with consistent theme colors (purple/violet palette)
- Mobile-first design (max-width: 448px)
- Glassmorphism effects with backdrop blur and rgba backgrounds
- Cosmic theme with floating animations and glow effects

### API Integration
- POST request to simulation endpoint with form data
- Response parsing utility converts string response to structured timeline
- Error handling for failed requests
- Loading states managed through Jotai atoms