import { database } from '../database/index.js';
import Sequelize from 'sequelize';

const Users = database.define(
    'users',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING(255),
            allowNull: false
        },
        token: {
            type: Sequelize.STRING(255),
            allowNull: false
        }

    }
)

export default Users;