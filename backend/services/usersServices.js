import clientModel from '../model/userModel.js';

async function getFindOne(login, senha) {
    const resultado = await clientModel.findAll({
        where: {
            login: login,
            senha: senha
        }
    });

    if (resultado[0] === undefined) return undefined;

    return resultado[0].dataValues;
}