class TrainerService {
    constructor() {
        this.trainerModel = require('../models/trainer.model');
    }

    async addTrainer(trainer) {
        let result;
        try {
            result = await this.trainerModel.create(trainer);
        } catch (error) {
            result = { error: error };
        }
        return result;
    }

    async getTrainers() {
        let result;
        try {
            result = await this.trainerModel.find({});
        } catch (error) {
            result = { error: error };
        }
        return result;
    }

    async getTrainer(id) {
        let result;
        try {
            result = await this.trainerModel.findById(id);
        } catch (error) {
            result = { error: error };
        }
        return result;
    }

    async getTrainerByUsername(username) {
        let result;
        username = username[0].toUpperCase() + username.slice(1).toLowerCase();
        try {
            result = await this.trainerModel.findOne({ username: username });
        } catch (error) {
            result = { error: error };
        }
        return result;
    }

    async updateTrainer(id, trainer) {
        let result;
        try {
            result = await this.trainerModel.findByIdAndUpdate(id, trainer);
        } catch (error) {
            result = { error: error };
        }
        return result;
    }

    async deleteTrainer(id) {
        let result;
        try {
            result = await this.trainerModel.findByIdAndDelete(id);
        } catch (error) {
            result = { error: error };
        }
        return result;
    }
}
