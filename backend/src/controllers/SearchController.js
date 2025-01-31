import User from "../models/User.js";
import { fetchFromTMDB } from "../services/tmdb.js";

class SearchController {

    // Search for a person
    static async searchPerson(req, res) {
        const { query } = req.params;
        try {
            const response = await fetchFromTMDB(
                `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
            );

            if (response.results.length === 0) {
                return res.status(404).send(null);
            }

            await User.findByIdAndUpdate(req.user.userId, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].profile_path,
                        title: response.results[0].name,
                        searchType: "person",
                        createdAt: new Date(),
                    },
                },
            });

            res.status(200).json({ success: true, content: response.results });
        } catch (error) {
            console.log("Error in searchPerson controller: ", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // Search for a movie
    static async searchMovie(req, res) {
        const { query } = req.params;

        try {
            const response = await fetchFromTMDB(
                `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
            );

            if (response.results.length === 0) {
                return res.status(404).send(null);
            }

            await User.findByIdAndUpdate(req.user.userId, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].poster_path,
                        title: response.results[0].title,
                        searchType: "movie",
                        createdAt: new Date(),
                    },
                },
            });

            res.status(200).json({ success: true, content: response.results });
        } catch (error) {
            console.log("Error in searchMovie controller: ", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // Search for a TV show
    static async searchTv(req, res) {
        const { query } = req.params;

        try {
            const response = await fetchFromTMDB(
                `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
            );

            if (response.results.length === 0) {
                return res.status(404).send(null);
            }

            await User.findByIdAndUpdate(req.user.userId, {
                $push: {
                    searchHistory: {
                        id: response.results[0].id,
                        image: response.results[0].poster_path,
                        title: response.results[0].name,
                        searchType: "tv",
                        createdAt: new Date(),
                    },
                },
            });

            res.status(200).json({ success: true, content: response.results });
        } catch (error) {
            console.log("Error in searchTv controller: ", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // Get search history
    static async getSearchHistory(req, res) {
        try {
            // Retrieve the user by their ID (from the authenticated user)
            const user = await User.findById(req.user.userId);

            if (!user) {
                return res.status(404).json({ success: false, message: "User not found" });
            }

            // Return the user's search history
            res.status(200).json({ success: true, content: user.searchHistory });
        } catch (error) {
            console.error("Error fetching search history:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    // Remove an item from search history
    static async removeItemFromSearchHistory(req, res) {
        let { id } = req.params;
        id = parseInt(id);

        try {
            await User.findByIdAndUpdate(req.user.userId, {
                $pull: {
                    searchHistory: { id: id },
                },
            });

            res.status(200).json({ success: true, message: "Item removed from search history" });
        } catch (error) {
            console.log("Error in removeItemFromSearchHistory controller: ", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default SearchController;
