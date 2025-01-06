import React, { useState, useEffect } from "react";

const SavedGamesContext = React.createContext();

export const SavedGamesProvider = ({ children }) => {
  const [savedGames, setSavedGames] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("JWT_TOKEN");
    if (token) {
      getSavedGames(token)
        .then((saved) => {
          setSavedGames(saved);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <SavedGamesContext.Provider value={{ savedGames, setSavedGames }}>
      {children}
    </SavedGamesContext.Provider>
  );
};

export default SavedGamesContext;
