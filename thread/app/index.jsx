import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'; 
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import DetailScreen from './screens/DetailScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import { FavoritesProvider } from './context/FavoritesContext';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen options={{headerShown: false }}  name="HomeMain" component={HomeScreen}/>
      <HomeStack.Screen options={{headerShown: false }} name="Category" component={CategoryScreen} />
      <HomeStack.Screen options={{headerShown: false }} name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

export default function App() {

  

  return (
    <FavoritesProvider>
         <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Search') {
                iconName = 'search';
              } else if (route.name === 'Favorite') {
                iconName = 'heart';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabel: () => null,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#2a2a2a',
              height: 60,
              borderTopWidth: 0, // This removes the top border line
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
            },
            tabBarItemStyle: {
              margin: 5,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Favorite" component={FavoritesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
     </FavoritesProvider>
  );
}