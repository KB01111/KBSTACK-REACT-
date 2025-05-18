# KBStack React Template Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Theming System](#theming-system)
6. [Navigation](#navigation)
7. [Components](#components)
8. [Hooks](#hooks)
9. [Code Quality Tools](#code-quality-tools)
10. [CI/CD Pipeline](#cicd-pipeline)
11. [Best Practices](#best-practices)
12. [Troubleshooting](#troubleshooting)

## Introduction

KBStack React is a highly optimized template for building cross-platform applications with Expo and React Native. It provides a solid foundation with strict TypeScript configuration, theming support, navigation, and best practices for code quality and performance.

### Key Features

- **Cross-Platform**: Build for Web, iOS, and Android from a single codebase
- **TypeScript**: Full type safety with strict configuration
- **Theming**: Light and dark mode with system preference detection
- **Navigation**: Type-safe navigation with React Navigation
- **Code Quality**: ESLint, Prettier, Husky, and CI/CD integration
- **Scalable Architecture**: Modular folder structure for maintainability

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/KB01111/KBSTACK-REACT-.git
cd KBSTACK-REACT-
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

This will open the Expo developer tools in your browser. From there, you can run the app on:
- iOS simulator (requires macOS and Xcode)
- Android emulator (requires Android Studio)
- Web browser
- Physical device using the Expo Go app

### Available Scripts

- `npm start`: Start the development server
- `npm run android`: Start the app on Android
- `npm run ios`: Start the app on iOS
- `npm run web`: Start the app in a web browser
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint with auto-fix
- `npm run format`: Run Prettier
- `npm run typecheck`: Run TypeScript type checking
- `npm run test`: Run tests

## Project Structure

The project follows a modular folder structure to ensure scalability and maintainability:

```
kbstack-react/
├── .github/             # GitHub Actions workflows
├── .husky/              # Git hooks
├── src/                 # Source code
│   ├── assets/          # Static assets (images, fonts)
│   ├── components/      # Reusable UI components
│   ├── constants/       # Application constants
│   ├── contexts/        # React Context providers
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # Screen components
│   ├── services/        # API and service integrations
│   ├── theme/           # Theming configuration
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── App.tsx              # Application entry point
├── babel.config.js      # Babel configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

### Key Files

- `App.tsx`: The root component that sets up providers and navigation
- `src/navigation/AppNavigator.tsx`: Main navigation configuration
- `src/contexts/ThemeContext.tsx`: Theme provider and hook
- `src/theme/theme.ts`: Theme tokens and configuration

## Core Features

### TypeScript Integration

The template uses TypeScript with strict mode enabled for maximum type safety. Path aliases are configured for clean imports:

```typescript
// Instead of this:
import { Button } from '../../../components/Button';

// You can use this:
import { Button } from '@components/Button';
```

Available path aliases:
- `@/*`: Maps to `src/*`
- `@components/*`: Maps to `src/components/*`
- `@screens/*`: Maps to `src/screens/*`
- `@hooks/*`: Maps to `src/hooks/*`
- `@utils/*`: Maps to `src/utils/*`
- `@navigation/*`: Maps to `src/navigation/*`
- `@services/*`: Maps to `src/services/*`
- `@assets/*`: Maps to `src/assets/*`
- `@types/*`: Maps to `src/types/*`
- `@constants/*`: Maps to `src/constants/*`
- `@contexts/*`: Maps to `src/contexts/*`
- `@theme/*`: Maps to `src/theme/*`

### Cross-Platform Support

The template is designed to work seamlessly across Web, iOS, and Android platforms. Platform-specific code can be handled using:

```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: Platform.OS === 'web' ? 16 : 12,
  },
});
```

## Theming System

The template includes a comprehensive theming system with support for light and dark modes.

### Theme Context

The `ThemeContext` provides access to the current theme and theme-switching functionality:

```typescript
import { useTheme } from '@contexts/ThemeContext';

const MyComponent = () => {
  const { theme, themeType, setThemeType, isDark } = useTheme();
  
  // Toggle between light and dark
  const toggleTheme = () => {
    setThemeType(isDark ? 'light' : 'dark');
  };
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Current theme: {themeType}
      </Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
};
```

### Theme Properties

The theme object includes:

- `colors`: Color palette for the theme
- `spacing`: Spacing values for consistent layout
- `fontSizes`: Typography sizes
- `fontWeights`: Typography weights
- `borderRadius`: Border radius values

Example usage:

```typescript
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
  },
  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.text,
  },
});
```

## Navigation

The template uses React Navigation for routing and navigation.

### Navigation Structure

- `AppNavigator`: The root navigator (Stack Navigator)
- `MainTabNavigator`: Bottom tab navigator for main app sections

### Type-Safe Navigation

Navigation is fully typed for type safety:

```typescript
// Navigation types
export type RootStackParamList = {
  Main: undefined;
  Detail: { id: string; title: string };
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Using navigation with type safety
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const navigateToDetail = () => {
    navigation.navigate('Detail', { id: '123', title: 'Item Details' });
  };
  
  return (
    <Button onPress={navigateToDetail} title="View Details" />
  );
};
```

## Components

The template includes several reusable components to get you started.

### Card Component

A versatile card component for displaying content:

```typescript
import Card from '@components/Card';

const MyScreen = () => {
  return (
    <Card>
      <Text>Card Content</Text>
    </Card>
  );
};
```

### Creating New Components

When creating new components, follow this pattern:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.secondary }
      ]}
    >
      <Text style={[styles.text, { color: theme.colors.light }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

export default Button;
```

## Hooks

The template includes custom hooks for common functionality.

### useApi Hook

A hook for handling API requests with loading, error, and data states:

```typescript
import { useApi } from '@hooks/useApi';

interface User {
  id: string;
  name: string;
}

const UserProfile = () => {
  const { data, loading, error, refetch } = useApi<User>('https://api.example.com/users/1');
  
  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error.message} />;
  
  return (
    <View>
      <Text>User: {data?.name}</Text>
      <Button onPress={refetch} title="Refresh" />
    </View>
  );
};
```

### Creating Custom Hooks

When creating custom hooks, follow these best practices:

1. Name hooks with the `use` prefix
2. Use TypeScript generics for flexibility
3. Handle loading and error states
4. Return a consistent interface

Example:

```typescript
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

## Code Quality Tools

The template includes several tools to ensure code quality.

### ESLint

ESLint is configured with rules for React, TypeScript, and accessibility. Run linting with:

```bash
npm run lint
# or
npm run lint:fix
```

### Prettier

Prettier ensures consistent code formatting. Format your code with:

```bash
npm run format
```

### Husky

Husky sets up Git hooks to enforce code quality:

- **pre-commit**: Runs lint-staged to lint and format staged files
- **pre-push**: Runs type checking and tests
- **commit-msg**: Validates commit messages

### lint-staged

lint-staged runs linters on staged files to ensure only quality code is committed:

```json
{
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ]
}
```

## CI/CD Pipeline

The template includes a GitHub Actions workflow for continuous integration.

### Workflow Configuration

The workflow is defined in `.github/workflows/ci.yml` and includes:

- **Linting**: Runs ESLint
- **Type Checking**: Runs TypeScript type checking
- **Testing**: Runs tests
- **Building**: Builds the web version and uploads artifacts

### Running Locally

You can test the CI pipeline locally by running:

```bash
npm run lint && npm run typecheck && npm run test
```

## Best Practices

### Component Design

- Keep components small and focused
- Use TypeScript interfaces for props
- Use the `useTheme` hook for styling
- Avoid inline styles
- Use memoization for expensive computations

### State Management

- Use React Context for global state
- Use local state for component-specific state
- Consider using Zustand for complex state management
- Use React Query for server state

### Performance Optimization

- Use `React.memo` for pure components
- Use `useCallback` for event handlers
- Use `useMemo` for expensive computations
- Avoid unnecessary re-renders
- Use FlatList for long lists

### TypeScript

- Enable strict mode
- Use interfaces for object shapes
- Use type guards for runtime type checking
- Use generics for reusable code
- Avoid using `any`

## Troubleshooting

### Common Issues

#### Metro Bundler Issues

If you encounter issues with the Metro bundler:

```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### TypeScript Errors

If you encounter TypeScript errors:

1. Check that all imports are correct
2. Ensure types are properly defined
3. Run `npm run typecheck` to see all errors

#### Navigation Issues

If you encounter navigation issues:

1. Check that all screen components are properly registered
2. Ensure navigation types are correctly defined
3. Check for circular dependencies

### Getting Help

If you need help with the template, you can:

1. Check the [Expo documentation](https://docs.expo.dev/)
2. Check the [React Navigation documentation](https://reactnavigation.org/docs/getting-started)
3. Open an issue on the GitHub repository
