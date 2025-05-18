import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '@theme/theme';

type ThemeType = 'light' | 'dark' | 'system';
type ThemeContextType = {
  theme: typeof lightTheme;
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [themeType, setThemeType] = useState<ThemeType>('system');
  
  // Determine if we should use dark mode
  const isDark = 
    themeType === 'system' 
      ? colorScheme === 'dark' 
      : themeType === 'dark';
  
  // Set the active theme based on dark mode status
  const theme = isDark ? darkTheme : lightTheme;
  
  // Update theme when system preference changes
  useEffect(() => {
    if (themeType === 'system') {
      // No need to do anything, the isDark calculation will handle it
    }
  }, [colorScheme, themeType]);
  
  return (
    <ThemeContext.Provider value={{ theme, themeType, setThemeType, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
