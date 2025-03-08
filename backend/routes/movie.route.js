import express from 'express';
import { getTrendingMovies , getMovieTrailer ,getMovieDetails ,getMovieSimilar , getMovieByCategory} from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/trending' , getTrendingMovies);
router.get("/:id/trailers", getMovieTrailer);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getMovieSimilar);
router.get("/:category", getMovieByCategory);

export default router;