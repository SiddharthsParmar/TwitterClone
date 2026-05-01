import {Router} from 'express'
import { Routes } from '../common/routes.interface'
import { UserController } from '../modules/user/controllers/user.controller';
import { UserRoutes } from '../modules/user/routes/user.routes';

export function buildApiRouter():Router{
    const router = Router();
    const routes:Routes[]=[
        new UserRoutes()

    ];

    routes.forEach((route)=>{
        router.use(route.path,route.router)
    })
    return router;
}