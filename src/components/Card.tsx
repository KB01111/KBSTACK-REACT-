import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: object;
}

const Card: React.FC<CardProps> = ({ children, style }) => {
  const { theme } = useTheme();
  
  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.shadow,
        },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default Card;
