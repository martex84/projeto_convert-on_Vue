import conectionServer from "./src/server/conectionServer.js";

import { database, conectionMysql, config } from './src/database/index.js'

import userModel from './src/model/userModel.js';

conectionServer();

(async () => {
    await database.sync();
})()

