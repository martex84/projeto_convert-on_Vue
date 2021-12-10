import conectionServer from "./src/server/conectionServer.js";

import { database, conectionMysql, config } from './src/database/index.js'

import { createAdmUser } from './src/services/usersServices.js'

conectionServer();

(async () => {
    await createAdmUser();

    await database.sync();
})()