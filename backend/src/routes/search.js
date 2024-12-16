import express from 'express';
import SearchController from '../controllers/SearchController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Protect search routes with authenticate middleware
router.get('/person/:query', authenticate, SearchController.searchPerson);
router.get('/movie/:query', authenticate, SearchController.searchMovie);
router.get('/tv/:query', authenticate, SearchController.searchTv);
router.get('/history', authenticate, SearchController.getSearchHistory);
router.delete('/history/:id', authenticate, SearchController.removeItemFromSearchHistory);

export default router;
