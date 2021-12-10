import { Sequelize } from 'sequelize';
import mysql from 'mysql2';

const config = {
    user: 'root',
    password: 'root',
    host: '172.17.0.2',
    database: 'bdConvertOn',
    port: 3306
}

const database = new Sequelize(
    config.database, //Name Db
    config.user, //User Db
    config.password, //Password Db
    {
        dialect: 'mysql', //Type Db
        host: config.host, //Host
        port: config.port //Default Port
    }
);

const conectionMysql = /* mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
}) */ ""

export {
    database,
    Sequelize,
    conectionMysql,
    config
};