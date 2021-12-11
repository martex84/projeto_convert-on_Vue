export default function criarLocalStorage(nomeLocalStorage) {
    localStorage.setItem(
        nomeLocalStorage,
        JSON.stringify({
            token: "",
            tabela: ""
        })
    );
}