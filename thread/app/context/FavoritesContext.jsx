// context/FavoritesContext.js
import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (image) => {
    setFavorites((prev) => [...prev, image]);
  };

  const removeFromFavorites = (imageId) => {
    setFavorites((prev) => prev.filter((img) => img.id !== imageId));
  };

  const isFavorite = (imageId) => {
    return favorites.some((img) => img.id === imageId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
