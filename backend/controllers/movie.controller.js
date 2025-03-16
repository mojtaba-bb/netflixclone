import { fetchFromTMDB } from "../services/tmdb.services.js";
export async function getTrendingMovies(req, res) {
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/popular?language=fa-IR`
        );
        const randomMovies = data.results[Math.floor(Math.random() * data.results?.length)];

        res.status(200).json({success: true, content: randomMovies});

        
    } catch (error) {
        res.status(500).json({ message: "خطای داخلی سرور "});
    }
}

export async function getMovieTrailer(req, res) {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
        );
        res.status(200).json({success: true, trailer: data.results});
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);}
        else{
            res.status(500).json({message: "خطای داخلی سرور"});
        }
    }}
export async function getMovieDetails(req, res) {
    try{
        const {id} = req.params;
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}?language=fa-IR`
        );
        res.status(200).json({success: true, content: data});
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);}
        else{
            res.status(500).json({message: "خطای داخلی سرور"});
        }
}}

export async function getMovieSimilar(req, res) {
    try{
        const {id} = req.params;
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${id}/similar?language=fa-IR`
        );
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);}
        else{
            res.status(500).json({message: "خطای داخلی سرور"});
        }
    }
}

export async function getMovieByCategory(req, res) {

    const {category} = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/movie/${category}?language=fa-IR`
        );
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        if(error.response.status === 404){
            res.status(404).send(null);}
        else{
            res.status(500).json({message: "خطای داخلی سرور"});

    }}}