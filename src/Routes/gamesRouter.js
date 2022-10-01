import express from "express";
import * as gamesControllers from '../Controllers/games.controller.js';

const router = express.Router();

router.post('/games', gamesControllers.createGames);
router.get('/games', gamesControllers.getGames);

export default router;