import { baseUrl, request } from "./constants";

export const getSavedGames = (token) => {
  return request(`${baseUrl}/games/saved`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    return data;
  });
};

export const addSavedGame = (
  {
    developer,
    freetogame_profile_url,
    game_url,
    genre,
    id,
    platform,
    publisher,
    release_date,
    short_description,
    thumbnail,
    title,
  },
  token
) => {
  return request(`${baseUrl}/games/saved`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      developer,
      freetogame_profile_url,
      game_url,
      genre,
      id,
      platform,
      publisher,
      release_date,
      short_description,
      thumbnail,
      title,
    }),
  }).then((data) => {
    return data;
  });
};

export const getSavedGame = (gameId, token) => {
  return request(`${baseUrl}/games/saved/${gameId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    return data;
  });
};

export const deleteSavedGame = (gameId, token) => {
  return request(`${baseUrl}/games/saved/${gameId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
