function catalogoBaseConversaoMoedas(objetoVerificacao, nomeLocalStorage) {
    let valorLocalStorage = JSON.parse(
        localStorage.getItem(nomeLocalStorage)
    );
    let valorRetorno = objetoVerificacao;
    const { dataBase } = valorLocalStorage.conversor;

    Object.keys(valorRetorno).forEach(valorConversao => {
        //Verificar a presenca das combinações formadas
        Object.keys(dataBase).forEach(primeiroValor => {
            const primeiroValorLocal = dataBase[primeiroValor];
            Object.keys(dataBase).forEach(segundoValor => {
                const segundoValorLocal = dataBase[segundoValor];

                if (`${primeiroValor}_${segundoValor}` === valorConversao) {
                    if (primeiroValorLocal === segundoValorLocal) {
                        valorRetorno[`${valorConversao}`] = 1;
                    } else if (primeiroValorLocal > segundoValorLocal) {
                        valorRetorno[`${valorConversao}`] =
                            primeiroValorLocal / segundoValorLocal;
                    } else {
                        valorRetorno[`${valorConversao}`] =
                            segundoValorLocal / primeiroValorLocal;
                    }
                }
            });
        });
    });

    return valorRetorno;
}

/*Irá pegar o campos base da função anterior, mais o valor principal a ser utilizado na conversão e o valor secundário,
verificando assim qual é maior no banco de dados para saber qual tipo conversão irá realizar*/
function verificacaoAutomaticaDaConversao(nomeLocalStorage, objetoPesquisa, valorInicial, ValorPrincipal, valorSecundario) {
    let valorLocalStorage = JSON.parse(
        localStorage.getItem(nomeLocalStorage)
    );
    let valorRetorno = 0;

    const { dataBase } = valorLocalStorage.conversor;

    Object.keys(objetoPesquisa).forEach(valorObjetoPesquisa => {

        Object.keys(dataBase).forEach(primeiroValor => {
            const primeiroValorLocal = dataBase[primeiroValor];

            if (primeiroValor === ValorPrincipal) {

                Object.keys(dataBase).forEach(segundoValor => {
                    const segundoValorLocal = dataBase[segundoValor];

                    if (segundoValor === valorSecundario) {

                        if (`${primeiroValor}_${segundoValor}` === valorObjetoPesquisa ||
                            `${segundoValor}_${primeiroValor}` === valorObjetoPesquisa) {

                            if (primeiroValorLocal >= segundoValorLocal) {

                                valorRetorno = valorInicial / (objetoPesquisa[`${valorObjetoPesquisa}`]);

                            } else {
                                valorRetorno = valorInicial * (objetoPesquisa[`${valorObjetoPesquisa}`]);
                            }
                        }
                    }
                });
            }
        });
    });

    valorRetorno = valorRetorno.toFixed(2);

    return valorRetorno;
}


export {
    catalogoBaseConversaoMoedas,
    verificacaoAutomaticaDaConversao
}