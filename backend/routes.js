import { Router } from 'express';

import * as userController from './src/controller/usersController.js'

const routes = Router();

routes.get("/user", (req, res) => {
    return userController.returnGet(req.query, res);
})

export default routes;