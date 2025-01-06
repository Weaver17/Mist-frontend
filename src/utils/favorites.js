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

export const addFavoriteGame = (game, token) => {
  return request(`${baseUrl}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(game),
  }).then(handleServerResponse);
};

export const removeFavoriteGame = (gameId, token) => {
  return request(`${baseUrl}/favorites/${gameId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
