import Sequelize from 'sequelize';

const database = new Sequelize(
    'bdConvertOn', //Name Db
    'root', //User Db
    'root', //Password Db
    {
        dialect: 'mysql', //Type Db
        host: '172.17.0.2', //Host
        port: 3306 //Default Port
    }
);

const sequelize = Sequelize;

export {
    database,
    sequelize
};