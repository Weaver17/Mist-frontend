import { baseUrl, request, handleServerResponse } from "./constants";

export const getSavedGames = (token) => {
  return request(`${baseUrl}/saved-games`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export const addSavedGame = (game, token) => {
  return request(`${baseUrl}/saved-games`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(game),
  }).then(handleServerResponse);
};

export const removeSavedGame = (gameId, token) => {
  return request(`${baseUrl}/saved-games/${gameId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};
