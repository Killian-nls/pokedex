

import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

class IndexController {
    public getHomePage(req: Request, res: Response) {
        res.render('home', { layout: 'main', baseUrl: process.env.POKEMON_API_BASE_URL, wsUrl: process.env.WS_BASE_URL });  
    }

    public getLoginPage(req: Request, res: Response) {
        res.render('login', { layout: 'main', baseUrl: process.env.POKEMON_API_BASE_URL, wsUrl: process.env.WS_BASE_URL });
    }

    public getTrainerPage(req: Request, res: Response) {
        res.render('trainers', { layout: 'main', baseUrl: process.env.POKEMON_API_BASE_URL, wsUrl: process.env.WS_BASE_URL });
    }
}

export default IndexController;