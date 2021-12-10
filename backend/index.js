import conectionServer from "./src/server/conectionServer.js";

import { database, conectionMysql, config } from './src/database/index.js'

import { createAdmUser } from './src/services/usersServices.js'

import userModel from './src/model/userModel.js'

conectionServer();

(async () => {
    //Irá criar o usuário administrador caso não tenha no sistema
    const user = userModel;

    await database.sync();

    await createAdmUser();
})()