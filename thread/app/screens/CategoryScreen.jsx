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

export default function CategoryScreen({ route, navigation }) {
  // Hide header for this screen
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
  }, [navigation]);

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

  const handleMenuPress = (itemId) => {
    console.log('Menu pressed for item:', itemId);
    // Add your menu functionality here
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.categoryTitle}>Threaded</Text>

      {hasSubcategories && (
        <View style={styles.categoryButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedSubcategory === 'All' && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedSubcategory('All')}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedSubcategory === 'All' && styles.selectedCategoryButtonText
            ]}>
              All
            </Text>
          </TouchableOpacity>

          {category.subcategories.map((sub) => (
            <TouchableOpacity
              key={sub.id}
              style={[
                styles.categoryButton,
                selectedSubcategory === sub.title && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedSubcategory(sub.title)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedSubcategory === sub.title && styles.selectedCategoryButtonText
              ]}>
                {sub.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={imagesToShow}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image 
                source={item.src} 
                style={styles.image} 
                resizeMode="cover"
              />
              
              {/* Centered Text Overlay */}
              <View style={styles.centeredOverlay}>
                <Text style={styles.centeredOverlayText}>{item.title}</Text>
              </View>
              
              {/* Three-dot menu icon on the left */}
              <TouchableOpacity 
                style={styles.menuIcon}
                onPress={() => handleMenuPress(item.id)}
              >
                <Ionicons 
                  name="ellipsis-vertical" 
                  size={20} 
                  color="white" 
                />
              </TouchableOpacity>
              
              {/* Heart icon on the right */}
              <TouchableOpacity
                style={styles.heartIcon}
                onPress={() =>
                  isFavorite(item.id)
                    ? removeFromFavorites(item.id)
                    : addToFavorites(item)
                }
              >
                <Ionicons
                  name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite(item.id) ? 'red' : 'white'}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'PlayfairDisplay-Bold',
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#ffffff',
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  selectedCategoryButtonText: {
    color: 'black',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 15,
  },
  imageContainer: {
    width: '48%',
    marginBottom: 15,
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 0.75,
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  centeredOverlay: {
    position: 'absolute',
    top: 140,
    left: 1,
    right: 6,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
   },
  centeredOverlayText: {
    color: 'white', 
    fontSize: 22,
    fontWeight: '500',
    fontFamily: 'PlayfairDisplay-Bold',
    textAlign: 'center',
    padding: 10,
  },
  menuIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 5,
  },
});