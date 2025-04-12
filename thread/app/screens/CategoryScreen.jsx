import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFavorites } from '../context/FavoritesContext';

export default function CategoryScreen({ route }) {
  const { category } = route.params;

  const {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  } = useFavorites();

  const hasSubcategories = category?.subcategories?.length > 0;
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  const getImagesToShow = () => {
    if (!hasSubcategories) return category?.images || [];

    if (selectedSubcategory === 'All') {
      return category.subcategories.flatMap((sub) => sub.images);
    }

    return (
      category.subcategories.find((sub) => sub.title === selectedSubcategory)
        ?.images || []
    );
  };

  const imagesToShow = getImagesToShow();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.categoryTitle}>{category?.title}</Text>

      {hasSubcategories && (
        <View style={styles.categoryButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedSubcategory === 'All' && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedSubcategory('All')}
          >
            <Text style={styles.categoryButtonText}>All</Text>
          </TouchableOpacity>

          {category.subcategories.map((sub) => (
            <TouchableOpacity
              key={sub.id}
              style={[
                styles.categoryButton,
                selectedSubcategory === sub.title &&
                  styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedSubcategory(sub.title)}
            >
              <Text style={styles.categoryButtonText}>{sub.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={imagesToShow}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image source={item.src} style={styles.image} />
              <View style={styles.overlayTextContainer}>
                <Text style={styles.overlayText}>{item.title}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                isFavorite(item.id)
                  ? removeFromFavorites(item.id)
                  : addToFavorites(item)
              }
            >
              <Ionicons
                name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                size={30}
                color="red"
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'playfair display',
    backgroundColor: '#0a0a0a',
    padding: 15,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  selectedCategoryButton: {
    backgroundColor: '#ffffff',
  },
  categoryButtonText: {
    color: 'black',
    fontSize: 14,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    width: '48%',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  overlayTextContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  heartIcon: {
    marginTop: 10,
  },
});
