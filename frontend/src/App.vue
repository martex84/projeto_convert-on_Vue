<template>
  <div id="app">
    <Login :nomeLocalStorage="nomeLocalStorage" :propsContainer="propsContainer" />
  </div>
</template>

<script>
import Login from "./components/Login/Login.vue";
import { apiBanco } from "./services/api.js";
import criarLocalStorage from "./services/criarLocalStorage.js";

let nomeLocalStorage = "convert-on";

export default {
  name: "App",
  components: {
    Login
  },
  data() {
    return {
      nomeLocalStorage,
      propsContainer: "grid"
    };
  },
  beforeMount() {
    //Cria local storage caso não tenha
    (() => {
      if (!localStorage.getItem(nomeLocalStorage)) {
        criarLocalStorage(nomeLocalStorage);
      } else {
        let valorLocalStorage = JSON.parse(
          localStorage.getItem(nomeLocalStorage)
        );

        const { token } = valorLocalStorage;

        (async () => {
          const resultadoPesquisa = await apiBanco
            .get(`/token?token=${token}`)
            .then(res => {
              return res.data;
            })
            .catch(err => console.log(err));

          console.log(resultadoPesquisa);

          if (resultadoPesquisa.tokenVerification === true) {
            alert("Bem Vindo!");
            if (this.propsContainer !== "none") {
              this.propsContainer = "none";
            }
          }
          //Caso o token esteja errado irá zerar os valores do LocalStorage
          else {
            this.propsContainer = "grid";
            localStorage.setItem(
              nomeLocalStorage,
              JSON.stringify({
                token: "",
                tabela: ""
              })
            );
          }
        })();
      }
    })();
    return {};
  }
};
</script>

<style>
body {
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;

  background-color: #a9e3ea;
}
</style>
