import * as usersService from '../services/usersServices.js'

async function returnGet(req, res) {
    return new Promise((resolve, reject) => {
        resolve(
            usersService.getFindOne(req)
        );
    }).then((resolve) => {
        const { token } = resolve;

        return res.json(token);
    })
}

export {
    returnGet
}