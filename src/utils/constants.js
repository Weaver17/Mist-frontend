export const baseUrl =
    import.meta.env.NODE_ENV === "production"
        ? "https://api.mist.port0.org"
        : "http://localhost:3002";

// stand in
export const gameUrl = "https://free-to-play-games-database.p.rapidapi.com/api";

export const headers = {
    "x-rapidapi-key": import.meta.env.VITE_X_RAPIDAPI_KEY,
    "x-rapidapi-host": import.meta.env.VITE_X_RAPIDAPI_HOST,
};
//

export const handleServerResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export function request(url, options) {
    return fetch(url, options).then(handleServerResponse);
}

export const categories = [
    "All",
    "MMO",
    "Shooter",
    "MOBA",
    "Anime",
    "Battle Royale",
    "Strategy",
    "Fantasy",
    "Sci-Fi",
    "Card Games",
    "Racing",
    "Fighting",
    "Social",
    "Sports",
];

export const sortOptionsArr = ["Relevance", "Release Date", "Alphabetical"];

export const platforms = ["All", "PC", "Browser"];

export const DEFAULT_VISIBLE_COUNT = 12;
export const VISIBLE_COUNT_ADD = 6;
