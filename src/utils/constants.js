export const baseUrl = "http://localhost:3004";

// stand in
export const gameUrl = "https://free-to-play-games-database.p.rapidapi.com/api";

export const headers = {
  "x-rapidapi-key": "2c2d5e4d5cmsh4f315d57b385065p170868jsn479b351889b4",
  "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
};
//

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}
