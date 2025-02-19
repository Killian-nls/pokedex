const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainer.controller');
const authM = require('../middlewares/auth.middleware');
// const permM = require('../middlewares/permissions.middleware');

router.get('/', authM, trainerController.getTrainers);
router.post('/', authM, trainerController.addTrainer);
router.get('/search', authM, trainerController.getTrainerByUsername);
router.get('/:id', authM, trainerController.getTrainer);
router.put('/:id', authM, trainerController.updateTrainer);
router.delete('/:id', authM, trainerController.deleteTrainer);
router.post('/mark', authM, trainerController.catchPokemon);
router.post('/see', authM, trainerController.seePokemon);
module.exports = router;