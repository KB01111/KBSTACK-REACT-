# Component Documentation

This document provides detailed documentation for each component in the KBStack React Template.

## Card Component

The Card component provides a consistent container for content with proper theming support.

### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| children | React.ReactNode | Content to display inside the card | Required |
| style | object | Additional styles to apply to the card | undefined |

### Usage

```tsx
import Card from '@components/Card';

const MyComponent = () => {
  return (
    <Card>
      <Text>Card content goes here</Text>
    </Card>
  );
};

// With custom styling
const MyCustomCard = () => {
  return (
    <Card style={{ marginBottom: 24, padding: 20 }}>
      <Text>Custom card content</Text>
    </Card>
  );
};
```

### Implementation Details

The Card component automatically applies theming from the ThemeContext, ensuring consistent appearance across light and dark modes. It includes:

- Proper border radius
- Border color based on theme
- Background color based on theme
- Shadow styling for elevation

## TouchableOption Component

A custom radio button-like component used in the Settings screen.

### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| label | string | Text to display next to the radio button | Required |
| selected | boolean | Whether this option is selected | Required |
| onPress | () => void | Function to call when pressed | Required |
| theme | Theme | Theme object from ThemeContext | Required |

### Usage

```tsx
import { TouchableOption } from '@components/TouchableOption';
import { useTheme } from '@contexts/ThemeContext';

const MyComponent = () => {
  const { theme } = useTheme();
  const [selected, setSelected] = useState('option1');
  
  return (
    <View>
      <TouchableOption
        label="Option 1"
        selected={selected === 'option1'}
        onPress={() => setSelected('option1')}
        theme={theme}
      />
      <TouchableOption
        label="Option 2"
        selected={selected === 'option2'}
        onPress={() => setSelected('option2')}
        theme={theme}
      />
    </View>
  );
};
```

## Future Components

When adding new components to the template, follow these guidelines:

1. Create a dedicated file in the `src/components` directory
2. Use TypeScript interfaces for props
3. Implement theming using the `useTheme` hook
4. Add proper documentation in this file
5. Include usage examples

### Component Template

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface MyComponentProps {
  title: string;
  // Add other props here
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MyComponent;
```
