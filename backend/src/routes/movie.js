import express from 'express';
import MovieController from '../controllers/MovieController.js';

const router = express.Router();

router.get('/trending', MovieController.getTrendingMovie);
router.get('/:id/trailers', MovieController.getMovieTrailers);
router.get('/:id', MovieController.getMovieDetails);
router.get('/:id/similar', MovieController.getSimilarMovies);
router.get('/category/:category', MovieController.getMoviesByCategory);

export default router;
