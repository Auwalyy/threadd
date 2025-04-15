import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const storyText = ['Where heritage meets ambition'];

  const categories = [
    {
      id: '1',
      title: 'Agbada',
      subcategories: [
        {
          id: '1-1',
          title: 'Kaftan',
          images: [
            { id: '1-1-0', src: require('../../assets/img1.jpg'), title: 'Agbada' },
            { id: '1-1-1', src: require('../../assets/kaftan/kf1.jpeg'), title: 'kaftan' },
            { id: '1-1-2', src: require('../../assets/kaftan/kf2.jpeg'), title: 'kaftan' },
            { id: '1-1-3', src: require('../../assets/kaftan/kf3.jpeg'), title: 'kaftan' },
            { id: '1-1-4', src: require('../../assets/kaftan/kf4.jpeg'), title: 'kaftan' },
            { id: '1-1-5', src: require('../../assets/kaftan/kf5.jpeg'), title: 'kaftan' },
          ],
        },
        {
          id: '1-2',
          title: 'Vodi',
          images: [
            { id: '1-2-1', src: require('../../assets/vodi/vd1.jpeg'), title: 'vodi' },
            { id: '1-2-2', src: require('../../assets/vodi/vd2.jpeg'), title: 'vodi' },
            { id: '1-2-3', src: require('../../assets/vodi/vd3.jpeg'), title: 'vodi' },
            { id: '1-2-4', src: require('../../assets/vodi/vd4.jpeg'), title: 'vodi' },
            { id: '1-2-5', src: require('../../assets/vodi/vd5.jpeg'), title: 'vodi' },
          ],
        },
        {
          id: '1-3',
          title: 'Simmer',
          images: [
            { id: '1-3-1', src: require('../../assets/simmer/sm1.jpeg'), title: 'Simmer' },
            { id: '1-3-2', src: require('../../assets/simmer/sm2.jpeg'), title: 'Simmer' },
            { id: '1-3-3', src: require('../../assets/simmer/sm3.jpeg'), title: 'Simmer' },
            { id: '1-3-4', src: require('../../assets/simmer/sm4.jpeg'), title: 'Simmer' },
            { id: '1-3-5', src: require('../../assets/simmer/sm5.jpeg'), title: 'Simmer' },
          ],
        },
        {
          id: '1-4',
          title: 'Cooltex',
          images: [
            { id: '1-4-1', src: require('../../assets/cooltex/col1.jpeg'), title: 'cooltex' },
            { id: '1-4-2', src: require('../../assets/cooltex/col2.jpeg'), title: 'cooltex' },
            { id: '1-4-3', src: require('../../assets/cooltex/col3.jpeg'), title: 'cooltex' },
            { id: '1-4-4', src: require('../../assets/cooltex/col4.jpeg'), title: 'cooltex' },
            { id: '1-4-5', src: require('../../assets/cooltex/col5.jpeg'), title: 'cooltex' },
            { id: '1-4-6', src: require('../../assets/cooltex/col6.jpeg'), title: 'cooltex' },
          ],
        },
        {
          id: '1-5',
          title: 'Wamball',
          images: [
            { id: '1-5-1', src: require('../../assets/wamball/wm1.jpeg'), title: 'wamball' },
            { id: '1-5-2', src: require('../../assets/wamball/wm2.jpeg'), title: 'wamball' },
            { id: '1-5-3', src: require('../../assets/wamball/wm3.jpeg'), title: 'wamball' },
            { id: '1-5-4', src: require('../../assets/wamball/wm4.jpeg'), title: 'wamball' },
            { id: '1-5-5', src: require('../../assets/wamball/wm5.jpeg'), title: 'wamball' },
            { id: '1-5-6', src: require('../../assets/wamball/wm6.jpeg'), title: 'wamball' },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Category 2',
      images: [
        { id: '2-1', src: require('../../assets/img1.jpg'), title: 'Image 1' },
        { id: '2-2', src: require('../../assets/img1.jpg'), title: 'Image 2' },
      ],
    },
    {
      id: '3',
      title: 'Category 3',
      images: [
        { id: '3-1', src: require('../../assets/img3.jpg'), title: 'Image 1' },
        { id: '3-2', src: require('../../assets/img1.jpg'), title: 'Image 2' },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Threaded</Text>

      <View style={styles.storyContainer}>
        {storyText.map((section, index) => (
          <Text key={index} style={styles.storyText}>
            {section}
          </Text>
        ))}
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.imageListContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const previewImage = item.subcategories
            ? item.subcategories[0]?.images[0]?.src
            : item.images[0]?.src;

          return (
            <TouchableOpacity onPress={() => navigation.navigate('Category', { category: item })}>
              <View style={styles.imageWrapper}>
                <Image source={previewImage} style={styles.image} />
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.overlayText}>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 20,
    paddingTop: 12,
    fontFamily: 'PlayfairDisplay-Regular',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 19,
    marginBottom: 0,  
    textAlign: 'center',
    color: 'white',
  },
  storyContainer: {
    marginBottom: 15,  
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyText: {
    fontSize: 18,
    lineHeight: 22,  
    marginTop: 4,
    marginBottom: 10, 
    color: 'white',
  },
  imageListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 27,
    paddingHorizontal: 10,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
   },
  image: {
    width: 260,
    height: 330,
    backgroundColor: 'gray',
    borderRadius: 20,
  },
  overlayTextContainer: {
    bottom: 12,
    right: 10,
    top: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
