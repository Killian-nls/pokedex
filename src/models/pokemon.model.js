const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: String,
    types: [String],
    imagePath: String,
    description: String,
    regions: [{
        regionName: String,
        regionPokedexNumber: Number
    }],
    height: Number,
    weight: Number,
    soundPath: String
});

pokemonSchema.pre('save', function(next) {
    console.log('Fonction exec avant save');
    this.name = this.name[0].toUpperCase() + this.name.slice(1).toLowerCase();
    this.regions.forEach(region => {
        region.regionName = region.regionName[0].toUpperCase() + region.regionName.slice(1).toLowerCase();
    });
    this.types.forEach(type => {
        type = type.toLowerCase();
    });
    next();
});


const pokemonModel = mongoose.model('Pokemon', pokemonSchema);

module.exports = pokemonModel
