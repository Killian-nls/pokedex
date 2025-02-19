const PokemonService = require('../services/pokemon.service');
const pokemonService = new PokemonService();

const UserService = require('../services/user.service');
const userService = new UserService();

exports.getTypes = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    const types = pokemonService.getTypes();
    const count = types.length;
    return res.status(200).json({
        data: types,
        count: count
    });
}

exports.getPokemons = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    const pokemons = await pokemonService.getPokemons();
    const count = pokemons.length;
    return res.status(200).json({
        data: pokemons,
        count: count
    });
}

exports.getPokemon = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    const name = req.query.name;
    const id = req.query.id;
    if (name) {
        const pokemon = await pokemonService.getPokemonByName(name);
        return res.status(200).json({
            data: pokemon
        });
    } else if (id) {
        const pokemon = await pokemonService.getPokemon(id);
        return res.status(200).json({
            data: pokemon
        });
    } else {
        return res.status(400).json({
            error: 'Vous devez spécifier un nom ou un identifiant de Pokémon'
        });
    }
}

exports.getPokemonsByRegion = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    const pokemons = await pokemonService.getPokemonsByRegion(req.params.region);
    const count = pokemons.length;
    return res.status(200).json({
        data: pokemons,
        count: count
    });
}

exports.searchPokemon = async (req, res) => {
    const partialName = req.query.partialName;
    const typeOne = req.query.typeOne;
    const typeTwo = req.query.typeTwo;
    const page = req.query.page;
    const size = req.query.size;
    const pokemons = await pokemonService.searchPokemon(partialName, typeOne, typeTwo, page, size);
    const count = pokemons.length;
    return res.status(200).json({
        data: pokemons,
        count: count
    });
}

exports.addPokemon = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    // console.log(req.auth.role);
    if (req.auth.role != 'admin') {
        return res.status(403).json({
            error: 'Vous devez être administrateur pour effectuer cette action'
        });
    }
    const pokemon = req.body;
    const result = await pokemonService.addPokemon(pokemon);
    return res.status(200).json({
        data: result
    });
}

exports.updatePokemon = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role != 'admin') {
        return res.status(403).json({
            error: 'Vous devez être administrateur pour effectuer cette action'
        });
    }
    if (!req.query.id) {
        return res.status(400).json({
            error: 'Vous devez spécifier un identifiant de Pokémon'
        });
    }
    const pokemon = req.query;
    const result = await pokemonService.updatePokemon(req.query.id, pokemon);
    return res.status(200).json({
        data: result
    });
}

exports.deletePokemon = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role != 'admin') {
        return res.status(403).json({
            error: 'Vous devez être administrateur pour effectuer cette action'
        });
    }
    const result = await pokemonService.deletePokemon(req.query.id);
    return res.status(200).json({
        data: result
    });
}

exports.addRegion = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role != 'admin') {
        return res.status(403).json({
            error: 'Vous devez être administrateur pour effectuer cette action'
        });
    }
    const region = req.body;
    const result = await pokemonService.addRegion(req.query.id, region);
    return res.status(200).json({
        data: result
    });
}

exports.deleteRegion = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role != 'admin') {
        return res.status(403).json({
            error: 'Vous devez être administrateur pour effectuer cette action'
        });
    }
    const result = await pokemonService.deleteRegion(req.query.id, regionName);
    return res.status(200).json({
        data: result
    });
}

async function getRole(userId) {
    return await userService.getRole(userId);
}