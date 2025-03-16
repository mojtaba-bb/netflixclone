import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function searchPerson(req, res) {
    const {query} = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=fa-IR&page=1`
        );
        if(response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, 
                    image: response.results[0].profile_path,
                    title: response.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        });
        res.status(200).json({success: true, content: response.results
        });
    } catch (error) {
        console.log("خطا در کنترلر searchPerson", error.message);
        res.status(500).json({message: "خطای داخلی سرور"});
    } 
}

export async function searchMovie(req, res) {
    const {query} = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=fa-IR&page=1`
        );
        if(response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, 
                    image: response.results[0].poster_path,
                    title: response.results[0].title,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }
        });
        res.status(200).json({success: true, content: response.results
        });
    } catch (error) {
        console.log("خطا در کنترلر searchMovie", error.message);
        res.status(500).json({message: "خطای داخلی سرور"});
    }
}

export async function searchTv(req, res) {
    const {query} = req.params;
    try {
        const response = await fetchFromTMDB(
            `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=fa-IR&page=1`
        );
        if(response.results.length === 0) {
            return res.status(404).send(null);
        }
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: response.results[0].id, 
                    image: response.results[0].poster_path,
                    title: response.results[0].name,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        });
        res.status(200).json({success: true, content: response.results
        });
    } catch (error) {
        console.log("خطا در کنترلر searchTv", error.message);
        res.status(500).json({message: "خطای داخلی سرور"});
} 
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({success: true, content: req.user.searchHistory});
    }
    catch (error) {
        console.log("خطا در کنترلر searchHistory", error.message);
        res.status(500).json({message: "خطای داخلی سرور"});
    }
}

export async function reamoveItemFromSearchHistory(req, res) {
    const {id} = req.params;
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: {
                    id: parseInt(id)
                }
            }
        });
        res.status(200).json({success: true, message: "مورد از تاریخچه جستجو حذف شد"});
    } catch (error) {
        console.log("خطا در کنترلر removeItemFromSearchHistory", error.message);
        res.status(500).json({message: "خطای داخلی سرور"});
    }

}