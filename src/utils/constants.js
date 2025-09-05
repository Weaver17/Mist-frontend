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
    { title: "All", slug: "All" },
    { title: "2D", slug: "2d" },
    { title: "3D", slug: "3d" },
    { title: "Action", slug: "action" },
    { title: "Action-RPG", slug: "action-rpg" },
    { title: "Anime", slug: "anime" },
    { title: "Battle Royale", slug: "battle-royal" },
    { title: "Card Games", slug: "card" },
    { title: "Fantasy", slug: "fantasy" },
    { title: "First Person", slug: "first-person" },
    { title: "Fighting", slug: "fighting" },
    { title: "Flight", slug: "flight" },
    { title: "Horror", slug: "horror" },
    { title: "Low-Spec", slug: "low-spec" },
    { title: "Martial Arts", slug: "martial-arts" },
    { title: "Military", slug: "military" },
    { title: "MOBA", slug: "moba" },
    { title: "MMO", slug: "mmo" },
    { title: "MMOFPS", slug: "mmofps" },
    { title: "MMORPG", slug: "mmorpg" },
    { title: "MMORTS", slug: "mmorts" },
    { title: "MMOTPS", slug: "mmotps" },
    { title: "Open World", slug: "open-world" },
    { title: "Permadeath", slug: "permadeath" },
    { title: "Pixel", slug: "pixel" },
    { title: "PVE", slug: "pve" },
    { title: "PVP", slug: "pvp" },
    { title: "Racing", slug: "racing" },
    { title: "Sandbox", slug: "sandbox" },
    { title: "Sailing", slug: "sailing" },
    { title: "Sci-Fi", slug: "sci-fi" },
    { title: "Shooter", slug: "shooter" },
    { title: "Side Scroller", slug: "side-scroller" },
    { title: "Social", slug: "social" },
    { title: "Space", slug: "space" },
    { title: "Sports", slug: "sports" },
    { title: "Strategy", slug: "strategy" },
    { title: "Superhero", slug: "superhero" },
    { title: "Survival", slug: "survival" },
    { title: "Tank", slug: "tank" },
    { title: "Third Person", slug: "third-person" },
    { title: "Top Down", slug: "top-down" },
    { title: "Tower Defense", slug: "tower-defense" },
    { title: "Turn Based", slug: "turn-based" },
    { title: "Voxel", slug: "voxel" },
    { title: "Zombie", slug: "zombie" },
];

export const sortOptionsArr = [
    { title: "Popularity", slug: "popularity" },
    { title: "Relevance", slug: "relevance" },
    { title: "Release Date", slug: "release-date" },
    { title: "Alphabetical", slug: "alphabetical" },
];

export const platforms = ["All", "PC", "Browser"];

export const DEFAULT_VISIBLE_COUNT = 12;
export const VISIBLE_COUNT_ADD = 6;
