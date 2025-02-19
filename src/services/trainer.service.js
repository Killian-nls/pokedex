class TrainerService {
    constructor() {
        this.trainerModel = require('../models/trainer.model');
        const PokemonService = require('./pokemon.service');
        this.pokemonService = new PokemonService();
        const UserService = require('./user.service');
        this.userService = new UserService();
    }

    async addTrainer(trainer) {
        let result;
        try {
            result = await this.trainerModel.create(trainer);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async getTrainers() {
        let result;
        try {
            result = await this.trainerModel.find({});
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async getTrainer(id) {
        let result;
        try {
            result = await this.trainerModel.findById(id);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async getTrainerByUsername(username) {
        let result;
        try {
            result = await this.trainerModel.findOne({ username: username });
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async updateTrainer(id, trainer) {
        let result;
        try {
            result = await this.trainerModel.findByIdAndUpdate(id, trainer);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async deleteTrainer(id) {
        let result;
        try {
            result = await this.trainerModel.findByIdAndDelete(id);
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async catchPokemon(id, idPokemon) {
        let result;
        try {
            const pokemon = await this.pokemonService.getPokemon(idPokemon);
            const trainer = await this.trainerModel.findById(id);
            trainer.pokemonCaptured.forEach (pkmn => {
                if (pkmn.name == pokemon.name) {
                    throw new Error('Ce dresseur possède déjà ce Pokémon');
                }
            });
            let seen = false;
            trainer.pokemonSeen.forEach (pkmn => {
                if (pkmn.name == pokemon.name) {
                    seen = true;
                }
            });
            if (!seen) {
                this.seePokemon(id, idPokemon);
            }
            result = await this.trainerModel.findByIdAndUpdate(id, { $push: { pokemonCaptured: pokemon } });
        } catch (error) {
            console.log(error.message);
            result = { error: error.message };
        }
        return result;
    }

    async seePokemon(id, idPokemon) {
        let result;
        try {
            const pokemon = await this.pokemonService.getPokemon(idPokemon);
            const trainer = await this.trainerModel.findById(id);
            trainer.pokemonSeen.forEach (pkmn => {
                if (pkmn.name == pokemon.name) {
                    throw new Error('Ce dresseur a déjà vu ce Pokémon');
                }
            });
            result = await this.trainerModel.findByIdAndUpdate(id, { $push: { pokemonSeen: pokemon } });
        } catch (error) {
            result = { error: error.message };
        }
        return result;
    }

    async getOwner(id) {
        const trainer = await this.trainerModel.findById(id);
        const username = trainer.username;
        const user = await this.userService.getUserByUsername(username);
        return user._id;
    }
}

module.exports = TrainerService;
