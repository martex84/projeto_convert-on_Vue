import { database, sequelize } from '../database/index.js';

const users = database.define(
    'users',
    {
        id: {
            type: sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: sequelize.STRING(255),
            allowNull: false
        },
        senha: {
            type: sequelize.STRING(255),
            allowNull: false
        },
        token: {
            type: sequelize.STRING(255),
            allowNull: false
        }

    }
)

export default users;