import { fetchFromTMDB } from "../services/tmdb.js";

class TVController {

    static async getTrendingTVShows(req, res) {
        try {
            const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
            const randomShow = data.results[Math.floor(Math.random() * data.results?.length)];
            res.json({ success: true, content: randomShow });
        } catch (error) {
            console.error("Error fetching trending TV shows:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    static async getTVShowTrailers(req, res) {
        const { id } = req.params;
        try {
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
            res.json({ success: true, trailers: data.results });
        } catch (error) {
            if (error.message.includes("404")) {
                return res.status(404).send(null);
            }
            console.error("Error fetching TV show trailers:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    static async getTVShowDetails(req, res) {
        const { id } = req.params;
        try {
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
            res.status(200).json({ success: true, content: data });
        } catch (error) {
            if (error.message.includes("404")) {
                return res.status(404).send(null);
            }
            console.error("Error fetching TV show details:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    static async getSimilarTVShows(req, res) {
        const { id } = req.params;
        try {
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
            res.status(200).json({ success: true, similar: data.results });
        } catch (error) {
            console.error("Error fetching similar TV shows:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    static async getTVShowsByCategory(req, res) {
        const { category } = req.params;
        try {
            const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
            res.status(200).json({ success: true, content: data.results });
        } catch (error) {
            console.error("Error fetching TV shows by category:", error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default TVController;
