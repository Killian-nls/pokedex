const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon.controller');
const authM = require('../middlewares/auth.middleware');
// const permM = require('../middlewares/permissions.middleware');

router.get('/types', pokemonController.getTypes);
router.post('/', authM, pokemonController.addPokemon);
router.get('/all', authM, pokemonController.getPokemons);
router.post('/region', authM, pokemonController.addRegion);
router.get('/search', authM, pokemonController.searchPokemon);
router.get('/', authM, pokemonController.getPokemon);
router.delete('/', authM, pokemonController.deletePokemon);
router.put('/', authM, pokemonController.updatePokemon);
router.delete('/region', authM, pokemonController.deleteRegion);
module.exports = router;
