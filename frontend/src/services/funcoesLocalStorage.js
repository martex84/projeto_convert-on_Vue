function criarLocalStorage(nomeLocalStorage) {
    localStorage.setItem(
        nomeLocalStorage,
        JSON.stringify({
            token: "",
            tabela: "",
            conversor: "",
        })
    );
}

function verificarLocalStorage(nomeLocalStorage) {
    const valorLocalStorage = JSON.parse(localStorage.getItem(nomeLocalStorage));

    if (!localStorage.getItem(nomeLocalStorage)) {
        return criarLocalStorage(nomeLocalStorage);
    }

    if (valorLocalStorage.token === undefined || valorLocalStorage.tabela === undefined || valorLocalStorage.conversor === undefined) {
        return criarLocalStorage(nomeLocalStorage);
    }
}

export {
    criarLocalStorage,
    verificarLocalStorage
}