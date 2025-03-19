import React, { createContext, useState, useContext } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (repo,totalContributors) => {
    setFavorites((prevFavorites) => {
      const updatedRepo = { ...repo, totalContributors };
      if (prevFavorites.find((favorite) => favorite.id === repo.id)) {
        return prevFavorites; 
      }
      return [...prevFavorites, updatedRepo]; 
    });
  };

  const removeFavorite = (repoId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((repo) => repo.id !== repoId));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);
