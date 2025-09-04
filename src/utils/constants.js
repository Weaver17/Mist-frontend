export const baseUrl =
    import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.MODE === "production"
        ? "https://api.mist.port0.org"
        : "http://localhost:3002");

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
    "2D",
    "3D",
    "Action",
    "Action-RPG",
    "Anime",
    "Battle Royale",
    "Card Games",
    "Fantasy",
    "First-Person",
    "Fighting",
    "Flight",
    "Horror",
    "Low-Spec",
    "Martial-Arts",
    "Military",
    "MOBA",
    "MMO",
    "MMOFPS",
    "MMORPG",
    "MMORTS",
    "MMOTPS",
    "Open-World",
    "Permadeath",
    "Pixel",
    "PVE",
    "PVP",
    "Racing",
    "Sandbox",
    "Sailing",
    "Sci-Fi",
    "Shooter",
    "Side-Scroller",
    "Social",
    "Space",
    "Sports",
    "Strategy",
    "Superhero",
    "Survival",
    "Tank",
    "Third-Person",
    "Top-Down",
    "Tower-Defense",
    "Turn-Based",
    "Voxel",
    "Zombie",
];

export const sortOptionsArr = ["Relevance", "Release Date", "Alphabetical"];

export const platforms = ["All", "PC", "Browser"];

export const DEFAULT_VISIBLE_COUNT = 12;
export const VISIBLE_COUNT_ADD = 6;
