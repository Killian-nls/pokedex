class PokemonService {
    constructor() {
        this.pokemonTypes = require('../models/pokemontype.model');
        this.pokemonModel = require('../models/pokemon.model');
    }

    getTypes() {
        return this.pokemonTypes;
    }

    async getPokemons() {
        let result;
        try {
            result = await this.pokemonModel.find({});
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async getPokemon(id) {
        let result;
        try {
            result = await this.pokemonModel.findById(id);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async getPokemonByName(name) {
        let result;
        name = name[0].toUpperCase() + name.slice(1).toLowerCase();
        try {
            result = await this.pokemonModel.findOne({ name: name });
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async searchPokemon(partialName, typeOne, typeTwo, page, size) {
        let query = {};
        if (partialName) {
            query.name = { $regex: partialName, $options: 'i' };
        }
        if (typeOne || typeTwo) {
            query.types = { $all: [] };
            if (typeOne) query.types.$all.push(typeOne.toLowerCase());
            if (typeTwo) query.types.$all.push(typeTwo.toLowerCase());
        }
        if (!page) page = 1;
        if (!size) size = 20;
        let result;
        try {
            result = await this.pokemonModel.find(query)
            .sort({ 'regions.regionName': 1, 'regions.regionPokedexNumber': 1 })
            .skip((page - 1) * size)
            .limit(size);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async addPokemon(pokemon) {
        let result;
        try {
            result = await this.pokemonModel.create(pokemon);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async updatePokemon(id, pokemon) {
        let result;
        if (pokemon.typeOne) {
            pokemon.types = [pokemon.typeOne];
        }
        if (pokemon.typeTwo) {
            if (!pokemon.types) {
                pokemon.types = [pokemon.typeTwo];
            } else {
                pokemon.types.push(pokemon.typeTwo);
            }
        }
        try {
            result = await this.pokemonModel.findByIdAndUpdate(id, pokemon);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async deletePokemon(id) {
        let result;
        try {
            result = await this.pokemonModel.findByIdAndDelete(id);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async getByType(type) {
        let result;
        try {
            result = await this.pokemonModel.find({ types: { $in: [type] } });
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async getByRegion(region) {
        let result;
        try {
            result = await this.pokemonModel.find({ regions: { $elemMatch: { regionName: region } } });
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async addRegion(id, region) {
        let result;
        try {
            result = await this.pokemonModel.findByIdAndUpdate(id, { $push: { regions: region } });
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async deleteRegion(id, regionName) {
        let result;
        try {
            result = await this.pokemonModel.findByIdAndUpdate(id, { $pull: { regions: { regionName: regionName } } });
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }   
}

module.exports = PokemonService;