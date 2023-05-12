import express from 'express'
import multer from 'multer';
import { createGame, getGame, getUserGames, deleteGame, searchGames, checkoutSession, updateGameStatus } from '../controllers/gameController.js';

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'frontend/public/Images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), createGame);
router.get('/user_games/:seller', getUserGames);
router.get('/:id', getGame);
router.delete('/delete/:id', deleteGame);
router.post('/search', searchGames)
router.post('/create-checkout-session', checkoutSession)
router.put('/update-games-status/:id', updateGameStatus)



export default router