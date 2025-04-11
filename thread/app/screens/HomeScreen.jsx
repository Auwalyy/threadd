import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const storyText = ["Where every stitch tells a story"];

  const images = [
    { id: '1', src: require('../../assets/img1.jpg'), title: 'Category 1' },
    { id: '2', src: require('../../assets/img2.jpg'), title: 'Category 2' },
    { id: '3', src: require('../../assets/img3.jpg'), title: 'Category 3' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Threaded</Text>

      <View style={styles.storyContainer}>
        {storyText.map((section, index) => (
          <Text key={index} style={styles.storyText}>{section}</Text>
        ))}
      </View>

      <FlatList
        horizontal
        data={images}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.imageListContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Category', { category: item })}>
            <View style={styles.imageWrapper}>
              <Image source={item.src} style={styles.image} />
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  storyContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyText: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 10,
    color: 'white',
  },
  imageListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  image: {
    width: 200,
    height: 300,
    backgroundColor: 'gray',
    borderRadius: 8,
  },
});
