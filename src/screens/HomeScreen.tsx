import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '@contexts/ThemeContext';
import { RootStackParamList } from '@navigation/AppNavigator';
import Card from '@components/Card';
import { SAMPLE_ITEMS } from '@constants/sampleData';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { theme } = useTheme();

  const handleItemPress = (id: string, title: string) => {
    navigation.navigate('Detail', { id, title });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Welcome to KBStack React
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>
        A highly optimized Expo template with TypeScript
      </Text>
      
      <FlatList
        data={SAMPLE_ITEMS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleItemPress(item.id, item.title)}
            activeOpacity={0.7}
          >
            <Card>
              <Text style={[styles.itemTitle, { color: theme.colors.text }]}>
                {item.title}
              </Text>
              <Text style={[styles.itemDescription, { color: theme.colors.secondary }]}>
                {item.description}
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 24,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
  },
});

export default HomeScreen;
