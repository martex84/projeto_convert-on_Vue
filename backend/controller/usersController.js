import * as usersService from '../services/usersServices.js'

async function returnGet(req, res) {
    return new Promise((resolve, reject) => { //Com a promise será possível esperar a resposta chegar
        resolve(
            usersService.getFindOne(req)
        );
    }).then((resolve) => {
        return res.json(resolve);
    })
}

export {
    returnGet
}