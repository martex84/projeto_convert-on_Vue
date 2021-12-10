import { Router } from 'express';

import * as userController from './src/controller/usersController.js'

const routes = Router();

routes.get("/user", (req, res) => {
    return userController.returnGetUser(req.query, res);
})

routes.get("/token", (req, res) => {
    return userController.returnGetToken(req.query, res);
})

export default routes;