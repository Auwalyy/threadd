import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CategoryScreen({ route }) {
  const { category } = route.params;
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const moreImages = [
    { id: '1', src: require('../../assets/img1.jpg'), title: 'Image 1' },
    { id: '2', src: require('../../assets/img2.jpg'), title: 'Image 2' },
    { id: '3', src: require('../../assets/img3.jpg'), title: 'Image 3' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category.title}</Text>

      <FlatList
        data={moreImages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item.src} style={styles.image} />
            <Text style={styles.imageTitle}>{item.title}</Text>
            <TouchableOpacity
              onPress={() =>
                isFavorite(item.id)
                  ? removeFromFavorites(item.id)
                  : addToFavorites(item)
              }
            >
              <Ionicons
                name={isFavorite(item.id) ? "heart" : "heart-outline"} // Solid heart if favorited, outline if not
                size={30}
                color="red"
                style={styles.heartIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 8,
  },
  imageTitle: {
    color: 'white',
    marginTop: 10,
  },
  heartIcon: {
    marginTop: 10,
  },
});
