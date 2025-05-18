import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';
import Card from '@components/Card';

const SettingsScreen = () => {
  const { theme, themeType, setThemeType, isDark } = useTheme();

  const handleThemeToggle = () => {
    setThemeType(isDark ? 'light' : 'dark');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Settings
      </Text>

      <Card>
        <View style={styles.settingRow}>
          <View>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Dark Mode
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondary }]}>
              Toggle between light and dark theme
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={handleThemeToggle}
            trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            thumbColor={theme.colors.light}
          />
        </View>
      </Card>

      <Card>
        <View style={styles.settingRow}>
          <View>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Theme Preference
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.secondary }]}>
              Choose your theme preference
            </Text>
          </View>
        </View>
        <View style={styles.radioGroup}>
          <TouchableOption
            label="System"
            selected={themeType === 'system'}
            onPress={() => setThemeType('system')}
            theme={theme}
          />
          <TouchableOption
            label="Light"
            selected={themeType === 'light'}
            onPress={() => setThemeType('light')}
            theme={theme}
          />
          <TouchableOption
            label="Dark"
            selected={themeType === 'dark'}
            onPress={() => setThemeType('dark')}
            theme={theme}
          />
        </View>
      </Card>

      <Card>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          About
        </Text>
        <Text style={[styles.aboutText, { color: theme.colors.text }]}>
          KBStack React Template v1.0.0
        </Text>
        <Text style={[styles.aboutDescription, { color: theme.colors.secondary }]}>
          A highly optimized Expo template with TypeScript, strict type safety, and best practices for modern React Native development.
        </Text>
      </Card>
    </ScrollView>
  );
};

interface TouchableOptionProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  theme: typeof import('@theme/theme').lightTheme;
}

const TouchableOption: React.FC<TouchableOptionProps> = ({ label, selected, onPress, theme }) => (
  <TouchableOpacity 
    style={[
      styles.radioOption,
      selected && { backgroundColor: theme.colors.primary + '20' }
    ]} 
    onPress={onPress}
  >
    <View style={[
      styles.radioCircle,
      { borderColor: selected ? theme.colors.primary : theme.colors.border }
    ]}>
      {selected && (
        <View style={[
          styles.radioInner,
          { backgroundColor: theme.colors.primary }
        ]} />
      )}
    </View>
    <Text style={[
      styles.radioLabel,
      { color: theme.colors.text }
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  radioGroup: {
    marginTop: 12,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default SettingsScreen;
