import express from 'express';
import TVController from '../controllers/TVController.js';

const router = express.Router();

router.get('/trending', TVController.getTrendingTVShows);
router.get('/:id/trailers', TVController.getTVShowTrailers);
router.get('/:id', TVController.getTVShowDetails);
router.get('/:id/similar', TVController.getSimilarTVShows);
router.get('/category/:category', TVController.getTVShowsByCategory);

export default router;
