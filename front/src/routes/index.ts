import { Request, Response } from 'express';
import { Router } from 'express';
import IndexController from '../controllers/index';

const router = Router();
const indexController = new IndexController();

export function setRoutes(app : any) {
    app.use('/', router);
    router.get('/', indexController.getHomePage);
    router.get('/login', indexController.getLoginPage);
    router.get('/trainers', indexController.getTrainerPage);
}