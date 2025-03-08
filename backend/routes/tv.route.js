import express from 'express';
import { getTrendingTV , getTVTrailer ,getTVDetails ,getTVSimilar , getTVByCategory} from '../controllers/tv.controller.js';

const router = express.Router();
router.get('/trending' , getTrendingTV);
router.get('/:id/trailers' , getTVTrailer);
router.get('/:id/details' , getTVDetails);  
router.get('/:id/similar' , getTVSimilar);
router.get('/:category' , getTVByCategory);

export default router; 