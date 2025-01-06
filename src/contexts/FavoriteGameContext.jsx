import React, { useState, useEffect } from "react";

const FavoriteGameContext = React.createContext();

export const FavoriteGameProvider = ({ children }) => {
  const [favoritedGames, setFavoritedGames] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      getFavorites(token)
        .then((favorites) => {
          setFavoritedGames(favorites);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <FavoriteGameContext.Provider value={{ favoritedGames, setFavoritedGames }}>
      {children}
    </FavoriteGameContext.Provider>
  );
};

export default FavoriteGameContext;
