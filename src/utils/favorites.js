import { baseUrl, request, handleServerResponse } from "./constants";

export const getFavorites = (token) => {
  return request(`${baseUrl}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

// export const addFavoriteGame = (gameInfo, token) => {
//   return request(`${baseUrl}/favorites`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: `Bearer ${token}`,
//     },
//   }).then(console.log(gameInfo));
// };

export const addFavoriteGame = (game, token, user) => {
  return request(`${baseUrl}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Authentication token
    },
    body: JSON.stringify({
      userId: user._id,
      gameId: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
      short_description: game.short_description,
      game_url: game.game_url,
      genre: game.genre,
      platform: game.platform,
      publisher: game.publisher,
      developer: game.developer,
      release_date: game.release_date,
      freetogame_profile_url: game.freetogame_profile_url,
    }),
  }).then(handleServerResponse);
};

export const removeFavoriteGame = (game, { token, _id }) => {
  request(`${baseUrl}/favorites/:${game.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
