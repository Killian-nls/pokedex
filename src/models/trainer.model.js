const mongoose = require('mongoose');
const pokemonModel = require('./pokemon.model');

const trainerSchema = new mongoose.Schema({
    username: String,
    trainerName: String,
    imgUrl: String,
    creationDate: Date,
    pokemonSeen: [pokemonModel.schema],
    pokemonCaptured: [pokemonModel.schema],
});

trainerSchema.pre('save', function(next) {
    console.log('Fonction exec avant save');
    this.trainerName = this.trainerName[0].toUpperCase() + this.trainerName.slice(1).toLowerCase();
    next();
});


const trainerModel = mongoose.model('Trainer', trainerSchema);

module.exports = trainerModel
