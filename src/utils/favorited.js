import { baseUrl, request } from "./constants";

export const getFavoritedGames = (token) => {
  return request(`${baseUrl}/games/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    return data;
  });
};

export const addFavoriteGame = (
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
  return request(`${baseUrl}/games/favorite`, {
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

export const getFavorite = (gameId, token) => {
  return request(`${baseUrl}/games/favorite/${gameId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((data) => {
    return data;
  });
};

export const deleteFavoritedGame = (gameId, token) => {
  return request(`${baseUrl}/games/favorite/${gameId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
