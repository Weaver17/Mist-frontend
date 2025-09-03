import { useState, useEffect } from "react";

import GameCard from "../GameCard/GameCard";
import Preloader from "../Preloader/Preloader";

import * as gameApi from "../../utils/gameApi";
import { categories } from "../../utils/constants";

import "./GamesSection.css";
import ShowMoreBtn from "../Buttons/ShowMoreBtn/ShowMoreBtn";
import { useGames } from "../../contexts/GameContext";
import ToTopBtn from "../Buttons/ToTopBtn/ToTopBtn";

const GamesSection = ({
    handleGameClick,
    favoritedGames,
    setFavoritedGames,
    savedGames,
    setSavedGames,
    onToTopClick,
    scrollPosition,
}) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSort, setSelectedSort] = useState("popularity");

    const { games, setGames, isLoading, setIsLoading, visibleCount } =
        useGames();

    // Platform dropdown removed
    //                 setGames(items);
    //                 console.log(selectedCategory);
    //             })
    //             .catch(console.error)
    //             .finally(setIsLoading(false));
    //     } else
    //         gameApi
    //             .getGamesByCategory(selectedCategory)
    //             .then((items) => {
    //                 setGames(items);
    //                 console.log(selectedCategory);
    //             })
    //             .catch(console.error)
    //             .finally(setIsLoading(false));
    // };

    // platform change
    // const handlePlatChange = () => {
    //     setIsLoading(true);

    //     gameApi
    //         .getGamesByPlatform(selectedPlatform.toLocaleLowerCase())
    //         .then((items) => {
    //             setGames(items);
    //         })
    //         .catch(console.error)
    //         .finally(setIsLoading(false));
    // };

    const onCatChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    useEffect(() => {
        setIsLoading(true);
        if (selectedCategory === "All" && selectedSort === "popularity") {
            gameApi
                .getGamesByPop()
                .then(setGames)
                .catch(console.error)
                .finally(() => setIsLoading(false));
        } else if (
            selectedCategory === "All" &&
            selectedSort !== "popularity"
        ) {
            gameApi
                .getGamesBySort(selectedSort)
                .then(setGames)
                .catch(console.error)
                .finally(() => setIsLoading(false));
        } else
            gameApi
                .getGames({
                    category: selectedCategory,
                    sortType: selectedSort,
                })
                .then(setGames)
                .catch(console.error)
                .finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory, selectedSort]);

    return (
        <div className="games">
            <div className="games__top-section">
                <div className="games__heading-border">
                    <h2 className="games__heading">Games</h2>
                </div>
                <div className="games__dropdowns-container">
                    <label className="games__dropdowns-label">
                        <p className="games__dropdowns-label-title">
                            Category:
                        </p>
                        <div className="games-select-container">
                            <select
                                onChange={onCatChange}
                                className="games__select games__select_cat"
                                name="category"
                                id="category"
                            >
                                {categories.map((category) => (
                                    <option
                                        className="games__select-option"
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </label>
                    <label className="games__dropdowns-label">
                        <p className="games__dropdowns-label-title">Sort by:</p>
                        <div className="games-select-container">
                            <select
                                onChange={(e) =>
                                    setSelectedSort(e.target.value)
                                }
                                className="games__select games__select_sort"
                                name="sort"
                                id="sort"
                                value={selectedSort}
                            >
                                <option value="release-date">
                                    Release Date
                                </option>
                                <option value="popularity">Popularity</option>
                                <option value="alphabetical">
                                    Alphabetical
                                </option>
                                <option value="relevance">Relevance</option>
                            </select>
                        </div>
                    </label>
                </div>
            </div>
            <ul className="games__list">
                {isLoading ? (
                    <Preloader />
                ) : (
                    games
                        .filter((game) => {
                            const categoryMatch =
                                selectedCategory === "All" ||
                                game.genre === selectedCategory;

                            return categoryMatch;
                        })
                        .slice(0, visibleCount)
                        .map((game) => (
                            <GameCard
                                key={game.id}
                                game={game}
                                onGameClick={handleGameClick}
                                favoritedGames={favoritedGames}
                                setFavoritedGames={setFavoritedGames}
                                savedGames={savedGames}
                                setSavedGames={setSavedGames}
                            />
                        ))
                )}
            </ul>
            {!isLoading && visibleCount < games.length && (
                <ShowMoreBtn type="button" classModifier="games" />
            )}
            <ToTopBtn
                onToTopClick={onToTopClick}
                scrollPosition={scrollPosition}
            />
        </div>
    );
};

export default GamesSection;
