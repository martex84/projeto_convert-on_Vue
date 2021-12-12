function criarLocalStorage(nomeLocalStorage) {
    localStorage.setItem(
        nomeLocalStorage,
        JSON.stringify({
            token: "",
            conversor: "",
        })
    );
}

function verificarLocalStorage(nomeLocalStorage) {
    const valorLocalStorage = JSON.parse(localStorage.getItem(nomeLocalStorage));

    if (!localStorage.getItem(nomeLocalStorage)) {
        return criarLocalStorage(nomeLocalStorage);
    }

    if (valorLocalStorage.token === undefined || valorLocalStorage.conversor === undefined) {
        return criarLocalStorage(nomeLocalStorage);
    }
}

export {
    criarLocalStorage,
    verificarLocalStorage
}