import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '@contexts/ThemeContext';
import { RootStackParamList } from '@navigation/AppNavigator';
import { SAMPLE_ITEMS } from '@constants/sampleData';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const { theme } = useTheme();
  const { id } = route.params;
  
  // Find the item with the matching ID
  const item = SAMPLE_ITEMS.find(item => item.id === id);
  
  if (!item) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.danger }]}>
          Item not found
        </Text>
      </View>
    );
  }
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {item.title}
      </Text>
      
      <View style={[styles.card, { 
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
      }]}>
        <Text style={[styles.description, { color: theme.colors.text }]}>
          {item.description}
        </Text>
        
        <Text style={[styles.content, { color: theme.colors.text }]}>
          {item.content || 'No additional content available.'}
        </Text>
      </View>
      
      <View style={styles.metadataContainer}>
        <Text style={[styles.metadataLabel, { color: theme.colors.secondary }]}>
          ID:
        </Text>
        <Text style={[styles.metadataValue, { color: theme.colors.text }]}>
          {item.id}
        </Text>
      </View>
      
      {item.tags && item.tags.length > 0 && (
        <View style={styles.tagsContainer}>
          <Text style={[styles.tagsLabel, { color: theme.colors.secondary }]}>
            Tags:
          </Text>
          <View style={styles.tagsList}>
            {item.tags.map((tag, index) => (
              <View 
                key={index} 
                style={[styles.tagChip, { backgroundColor: theme.colors.primary }]}
              >
                <Text style={[styles.tagText, { color: theme.colors.light }]}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

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
  card: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
  },
  metadataContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metadataLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  metadataValue: {
    fontSize: 14,
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagsLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 24,
  },
});

export default DetailScreen;
