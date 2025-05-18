# Theming Documentation

This document provides detailed information about the theming system in the KBStack React Template.

## Overview

The KBStack React Template includes a comprehensive theming system that supports:

- Light and dark modes
- System preference detection
- Runtime theme switching
- Fully typed theme properties
- Consistent styling across the application

## Theme Structure

The theme is defined in `src/theme/theme.ts` and includes the following properties:

```typescript
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
    background: string;
    text: string;
    border: string;
    shadow: string;
    card: string;
    input: string;
    placeholder: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontSizes: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  fontWeights: {
    light: string;
    regular: string;
    medium: string;
    semibold: string;
    bold: string;
  };
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };
}
```

## Theme Context

The theme is provided through a React Context (`ThemeContext`) that makes it available throughout the application.

### ThemeProvider

The `ThemeProvider` component wraps your application and provides the theme context:

```tsx
// In App.tsx
import { ThemeProvider } from '@contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### useTheme Hook

The `useTheme` hook provides access to the current theme and theme-switching functionality:

```tsx
import { useTheme } from '@contexts/ThemeContext';

const MyComponent = () => {
  const { theme, themeType, setThemeType, isDark } = useTheme();
  
  // theme: The current theme object with all properties
  // themeType: 'light', 'dark', or 'system'
  // setThemeType: Function to change the theme
  // isDark: Boolean indicating if dark mode is active
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Hello, world!
      </Text>
    </View>
  );
};
```

## Using the Theme

### Styling Components

When styling components, use the theme properties for consistency:

```tsx
import { StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.colors.background }
    ]}>
      <Text style={[
        styles.title,
        { color: theme.colors.text }
      ]}>
        Hello, world!
      </Text>
      <View style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        }
      ]}>
        <Text style={{ color: theme.colors.text }}>
          Card content
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
```

### Theme Switching

You can allow users to switch themes using the `setThemeType` function:

```tsx
import { useTheme } from '@contexts/ThemeContext';

const ThemeSwitcher = () => {
  const { themeType, setThemeType } = useTheme();
  
  return (
    <View>
      <Button
        title="Light Mode"
        onPress={() => setThemeType('light')}
        disabled={themeType === 'light'}
      />
      <Button
        title="Dark Mode"
        onPress={() => setThemeType('dark')}
        disabled={themeType === 'dark'}
      />
      <Button
        title="System Default"
        onPress={() => setThemeType('system')}
        disabled={themeType === 'system'}
      />
    </View>
  );
};
```

## Customizing the Theme

### Modifying Theme Colors

To customize the theme colors, edit the `src/theme/theme.ts` file:

```typescript
// Example: Changing the primary color
export const lightTheme = {
  colors: {
    primary: '#ff0000', // Changed from '#0070f3' to red
    // ... other colors
  },
  // ... other theme properties
};

export const darkTheme = {
  colors: {
    primary: '#ff3333', // Changed from '#0070f3' to a lighter red for dark mode
    // ... other colors
  },
  // ... other theme properties
};
```

### Adding New Theme Properties

To add new properties to the theme, update both the theme objects and the TypeScript types:

1. First, update the theme objects in `src/theme/theme.ts`:

```typescript
export const lightTheme = {
  // ... existing properties
  animations: {
    fast: 200,
    medium: 300,
    slow: 500,
  },
};

export const darkTheme = {
  // ... existing properties
  animations: {
    fast: 200,
    medium: 300,
    slow: 500,
  },
};
```

2. Then, update the type definitions to include the new properties:

```typescript
// You might need to create a types file or update an existing one
export interface Theme {
  // ... existing properties
  animations: {
    fast: number;
    medium: number;
    slow: number;
  };
}
```

## Best Practices

1. **Always use the theme for styling**: Avoid hardcoded colors or values
2. **Use theme tokens consistently**: Use `theme.colors.primary` instead of custom color values
3. **Test in both light and dark modes**: Ensure your UI looks good in both themes
4. **Use semantic color names**: Use `theme.colors.danger` for error states instead of `'red'`
5. **Consider accessibility**: Ensure sufficient contrast between text and background colors

## Advanced Usage

### Creating Theme-Aware Components

You can create components that automatically adapt to the current theme:

```tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => {
  const { theme } = useTheme();
  
  // Determine background color based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'danger':
        return theme.colors.danger;
      default:
        return theme.colors.primary;
    }
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: theme.borderRadius.md,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: theme.colors.light }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});

export default Button;
```

### Persisting Theme Preference

To persist the user's theme preference, you can use AsyncStorage:

```tsx
// In ThemeContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Inside ThemeProvider component
useEffect(() => {
  const loadThemePreference = async () => {
    try {
      const savedThemeType = await AsyncStorage.getItem('themeType');
      if (savedThemeType) {
        setThemeType(savedThemeType as ThemeType);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };
  
  loadThemePreference();
}, []);

// Update setThemeType function
const setThemeTypeAndSave = (type: ThemeType) => {
  setThemeType(type);
  AsyncStorage.setItem('themeType', type).catch(error => {
    console.error('Failed to save theme preference:', error);
  });
};
```
