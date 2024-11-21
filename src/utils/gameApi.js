import { request, gameUrl, headers } from "./constants";

export const getGamesByReleaseDate = () => {
  // change to /games
  return request(`${gameUrl}/games?sort-by=release-date`, { headers });
};

export const getGamesByRelevance = () => {
  // change to /games
  return request(`${gameUrl}/games?sort-by=relevance`, { headers });
};

export const getGameById = (id) => {
  return request(`${gameUrl}/game?id=${id}`, { headers });
};

export const getAllGames = () => {
  return request(`${gameUrl}/games`, { headers });
};

export const getGamesByPlatform = (platform) => {
  return request(`${gameUrl}/games?platform=${platform}`, { headers });
};

export const getGamesBySort = (sortType) => {
  return request(`${gameUrl}/games?sort-by=${sortType}`, { headers });
};

export const getGamesByCategory = (category) => {
  return request(`${gameUrl}/games?category=${category}`, { headers });
};

export const getGamesByPlatCatSort = (platform, category, sortType) => {
  return request(
    `${gameUrl}/games?platform=${platform}&category=${category}&sort-by=${sortType}`,
    { headers }
  );
};

// Authentication: Currently, no authentication is required to access the API.
//  Simply make HTTP requests to the provided endpoints.

// Base URL: The base URL for the API is https://www.freetogame.com/api.

// Endpoints: Below are the available endpoints:

// /games    ===  Retrieve a list of all free-to-play games.

// /game?id={game_id}   ===   Retrieve details of a specific game by its ID.

// /games?category={category_name}   ===    Retrieve a list of all available
// games from a specific genre.

// /games?platform={platform_name}   ===    Retrieve a list of all available
// games from a specific platform.

// /games?sort-by={sort_name}   =           Sort games by release date, alphabetical
// or relevance.
