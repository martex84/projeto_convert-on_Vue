import JsonWebToken from 'jsonwebtoken';

import users from '../model/userModel.js';

async function getFindUser(req) {
    const { login, senha } = req;

    const resultado = await users.findAll({
        where: {
            login: login,
            senha: senha
        }
    });

    if (resultado[0] === undefined) return undefined;

    return resultado[0].dataValues;
}

async function getFindToken(req) {
    const { token } = req;

    const resultado = await users.findOne({
        where: {
            token: token
        }
    })

    if (resultado === undefined || resultado === null) return { tokenVerification: false };

    const descriptografar = verifyToken(resultado.dataValues.token);

    const verificaLogin = await users.findOne({
        where: {
            login: descriptografar
        }
    })

    if (verificaLogin === undefined) return { tokenVerification: false };

    return { tokenVerification: true }
}

async function createAdmUser() {
    const resultadoPesquisa = await users.findOne({
        where: {
            login: 'admin@admin',
            senha: 'admin'
        }
    }).catch((err) => console.error("\n", err, "\n"))

    const token = createToken('admin');

    if (resultadoPesquisa === null) {
        const resultInclement = await users.create({
            login: 'admin@admin',
            senha: 'admin',
            token: token
        });
    }
}

function createToken(login) {
    const criptografia = JsonWebToken.sign({
        foo: login
    }, '07129533d4235a9ba3df3600152617d4');

    return criptografia;
}

function verifyToken(token) {
    const returnValor = JsonWebToken.verify(token, '07129533d4235a9ba3df3600152617d4').foo

    return returnValor;
}

export {
    createAdmUser,
    getFindUser,
    getFindToken
}