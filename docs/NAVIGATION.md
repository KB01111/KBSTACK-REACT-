# Navigation Documentation

This document provides detailed information about the navigation system in the KBStack React Template.

## Overview

The KBStack React Template uses React Navigation for routing and navigation. The navigation system is:

- Type-safe with TypeScript
- Hierarchical with nested navigators
- Themeable to match the application's design
- Configured for common navigation patterns

## Navigation Structure

The navigation structure is defined in `src/navigation/AppNavigator.tsx` and consists of:

1. **Root Stack Navigator**: Handles the main application flow
2. **Tab Navigator**: Manages the main sections of the application

### Navigation Types

The navigation types are defined to ensure type safety:

```typescript
// Root stack navigation types
export type RootStackParamList = {
  Main: undefined;
  Detail: { id: string; title: string };
};

// Tab navigation types
export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
```

## Using Navigation

### Navigating Between Screens

To navigate between screens, use the `useNavigation` hook:

```typescript
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/AppNavigator';

// Define the navigation prop type for type safety
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  // Get the navigation object with proper typing
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  // Navigate to another screen
  const handlePress = () => {
    navigation.navigate('Detail', {
      id: '123',
      title: 'Item Details',
    });
  };
  
  return (
    <Button onPress={handlePress} title="View Details" />
  );
};
```

### Accessing Route Parameters

To access route parameters, use the `useRoute` hook:

```typescript
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/AppNavigator';

// Define the route prop type for type safety
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  // Get the route object with proper typing
  const route = useRoute<DetailScreenRouteProp>();
  
  // Access route parameters
  const { id, title } = route.params;
  
  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
    </View>
  );
};
```

## Customizing Navigation

### Screen Options

You can customize the appearance of screens using the `screenOptions` prop:

```typescript
<Stack.Navigator
  screenOptions={{
    headerStyle: {
      backgroundColor: theme.colors.card,
    },
    headerTintColor: theme.colors.text,
    contentStyle: {
      backgroundColor: theme.colors.background,
    },
  }}
>
  {/* Screen definitions */}
</Stack.Navigator>
```

### Individual Screen Options

You can also customize individual screens:

```typescript
<Stack.Screen 
  name="Detail" 
  component={DetailScreen} 
  options={({ route }) => ({ 
    title: route.params?.title || 'Detail',
    headerRight: () => (
      <Button onPress={() => console.log('Share')} title="Share" />
    ),
  })} 
/>
```

### Dynamic Screen Options

For dynamic screen options based on state or props:

```typescript
const DetailScreen = ({ navigation, route }) => {
  const { theme } = useTheme();
  
  // Set navigation options dynamically
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.light,
    });
  }, [navigation, theme]);
  
  return (
    <View>
      <Text>Detail Screen</Text>
    </View>
  );
};
```

## Tab Navigation

The template includes a tab navigator for the main sections of the application.

### Tab Icons

Tab icons are configured using Ionicons:

```typescript
<Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName: keyof typeof Ionicons.glyphMap = 'home';
      
      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person' : 'person-outline';
      } else if (route.name === 'Settings') {
        iconName = focused ? 'settings' : 'settings-outline';
      }
      
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: theme.colors.primary,
    tabBarInactiveTintColor: theme.colors.secondary,
    tabBarStyle: {
      backgroundColor: theme.colors.card,
      borderTopColor: theme.colors.border,
    },
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
  <Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>
```

## Advanced Navigation

### Nested Navigators

You can create nested navigators for more complex navigation structures:

```typescript
// Define a nested stack navigator
const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
};

// Use the nested navigator in the tab navigator
<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Profile" component={ProfileStackNavigator} />
  <Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>
```

### Deep Linking

To support deep linking, configure the linking options:

```typescript
// In App.tsx
import { LinkingOptions } from '@react-navigation/native';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['kbstack://', 'https://kbstack.example.com'],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          Profile: 'profile',
          Settings: 'settings',
        },
      },
      Detail: {
        path: 'detail/:id',
        parse: {
          id: (id: string) => id,
        },
      },
    },
  },
};

// Pass to NavigationContainer
<NavigationContainer linking={linking}>
  {/* ... */}
</NavigationContainer>
```

## Best Practices

1. **Use TypeScript**: Always define navigation and route types for type safety
2. **Keep navigation logic separate**: Don't mix navigation logic with UI components
3. **Use consistent naming**: Follow a consistent naming convention for screens and navigators
4. **Theme your navigation**: Use the theme context to style navigation components
5. **Handle navigation errors**: Add error boundaries around navigation components
6. **Test navigation flows**: Ensure all navigation paths work as expected

## Troubleshooting

### Common Issues

#### Type Errors

If you encounter type errors with navigation:

1. Ensure your navigation types are correctly defined
2. Check that you're using the correct navigation hook (`useNavigation` vs `useRoute`)
3. Verify that you've properly typed the navigation prop

#### Screen Not Rendering

If a screen is not rendering:

1. Check that the screen component is correctly exported and imported
2. Verify that the screen is registered in the navigator
3. Check for any errors in the screen component

#### Navigation Props Not Working

If navigation props are not working:

1. Ensure you're using the correct navigation hook
2. Check that you've properly typed the navigation prop
3. Verify that the screen is registered in the correct navigator
