const { response } = require('express');
const TrainerService = require('../services/trainer.service');
const trainerService = new TrainerService();

const UserService = require('../services/user.service');
const userService = new UserService();

exports.getTrainers = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role !== 'admin') {
        return res.status(403).json({
            error: 'Vous n\'avez pas les permissions pour accéder à cette ressource'
        });
    }
    const trainers = await trainerService.getTrainers();
    const count = trainers.length;
    return res.status(200).json({
        data: trainers,
        count: count
    });
}

exports.getTrainer = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    const id = req.params.id;
    if (id) {
        const trainer = await trainerService.getTrainer(id);
        return res.status(200).json({
            data: trainer
        });
    } else {
        return res.status(400).json({
            error: 'Vous devez spécifier un identifiant de dresseur'
        });
    }
}

exports.getTrainerByUsername = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    const username = req.query.username;
    if (username) {
        const trainer = await trainerService.getTrainerByUsername(username);
        return res.status(200).json({
            data: trainer
        });
    } else {
        return res.status(400).json({
            error: 'Vous devez spécifier un nom d\'utilisateur de dresseur'
        });
    }
}

exports.addTrainer = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    req.auth.username = await getUsername(req.auth.userId);
    if (req.auth.role !== 'admin' && req.auth.username !== req.body.username) {
        return res.status(403).json({
            error: 'Vous n\'avez pas les permissions pour accéder à cette ressource'
        });
    }
    const trainer = req.body;
    const result = await trainerService.addTrainer(trainer);
    return res.status(201).json({
        data: result
    });
}

exports.updateTrainer = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role !== 'admin' && req.auth.userId != await getOwner(req.params.id)) {
        return res.status(403).json({
            error: 'Vous n\'avez pas les permissions pour accéder à cette ressource'
        });
    }
    const id = req.params.id;
    const trainer = req.body;
    if (id) {
        const result = await trainerService.updateTrainer(id, trainer);
        return res.status(200).json({
            data: result
        });
    } else {
        return res.status(400).json({
            error: 'Vous devez spécifier un identifiant de dresseur'
        });
    }
}

exports.deleteTrainer = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role !== 'admin' && req.auth.userId != await getOwner(req.params.id)) {
        return res.status(403).json({
            error: 'Vous n\'avez pas les permissions pour accéder à cette ressource'
        });
    }
    const id = req.params.id;
    if (id) {
        const result = await trainerService.deleteTrainer(id);
        return res.status(200).json({
            data: result
        });
    } else {
        return res.status(400).json({
            error: 'Vous devez spécifier un identifiant de dresseur'
        });
    }
}

exports.catchPokemon = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role !== 'admin' && req.auth.userId != await getOwner(req.body.idTrainer)) {
        return res.status(403).json({
            error: 'Vous n\'avez pas les permissions pour accéder à cette ressource'
        });
    }
    const idTrainer = req.body.idTrainer;
    const idPokemon = req.body.idPokemon;
    if (idTrainer && idPokemon) {
        const result = await trainerService.catchPokemon(idTrainer, idPokemon);
        return res.status(200).json({
            data: result
        });
    } else {
        return res.status(400).json({
            error: 'Vous devez spécifier un identifiant de dresseur et un identifiant de Pokémon'
        });
    }
}

exports.seePokemon = async (req, res) => {
    req.auth.role = await getRole(req.auth.userId);
    if (req.auth.role !== 'admin' && req.auth.userId != await getOwner(req.body.idTrainer)) {
        return res.status(403).json({
            error: 'Vous n\'avez pas les permissions pour accéder à cette ressource'
        });
    }
    const idTrainer = req.body.idTrainer;
    const idPokemon = req.body.idPokemon;
    if (idTrainer && idPokemon) {
        const result = await trainerService.seePokemon(idTrainer, idPokemon);
        return res.status(200).json({
            data: result
        });
    } else {
        return res.status(400).json({
            error: 'Vous devez spécifier un identifiant de dresseur et un identifiant de Pokémon'
        });
    }
}

async function getRole(userId) {
    return await userService.getRole(userId);
}

async function getOwner(trainerId) {
    return await trainerService.getOwner(trainerId);
}

async function getUsername(userId) {
    let response = await userService.getUserById(userId);
    return response.username;
}