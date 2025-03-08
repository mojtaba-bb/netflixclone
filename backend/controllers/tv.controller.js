import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingTV(req, res) {
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/popular?language=fa-IR`
        );
        const randomTV = data.results[Math.floor(Math.random() * data.results?.length)];

        res.status(200).json({success: true, content: randomTV});

        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}
export async function getTVTrailer(req, res) {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
        );
        res.status(200).json({success: true, trailer: data.results});
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);}
        else{
            res.status(500).json({message: "Internal Server Error"});
        }
    }}
export async function getTVDetails(req, res) {
    try{
        const {id} = req.params;
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}?language=fa-IR`
        );
        res.status(200).json({success: true, content: data});
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);}
        else{
            res.status(500).json({message: "Internal Server Error"});
        }
}}

export async function getTVSimilar(req, res) {
    try{
        const {id} = req.params;
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${id}/similar?language=fa-IR`
        );
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);}
        else{
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}

export async function getTVByCategory(req, res) {
    const {category} = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${category}?language=fa-IR`
        );
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}