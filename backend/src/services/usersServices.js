import users from '../model/userModel.js';

async function getFindOne(req) {
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

async function createAdmUser() {
    const resultadoPesquisa = await users.findOne({
        where: {
            login: 'admin',
            senha: 'admin'
        }
    }).catch((err) => console.error("\n", err, "\n"))

    if (resultadoPesquisa === null) {
        const resultInclement = await users.create({
            login: 'admin',
            senha: 'admin',
            token: 'token'
        });
    }

}

export {
    createAdmUser,
    getFindOne
}