import * as usersService from '../services/usersServices.js'

async function returnGetUser(req, res) {
    return new Promise((resolve, reject) => {
        resolve(
            usersService.getFindUser(req)
        );
    }).then((resolve) => {
        const { token } = resolve;

        return res.json(token);
    })
}

async function returnGetToken(req, res) {
    return new Promise((resolve, reject) => {
        resolve(
            usersService.getFindToken(req)
        );
    }).then((resolve) => {
        console.log(resolve)
        return res.json(resolve);
    }).catch((err) => {
        return err.json(err);
    })
}

export {
    returnGetUser,
    returnGetToken
}