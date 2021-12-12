<template>
  <div id="app" class="d-flex justify-content-center align-items-center position-relative">
    <Login :nomeLocalStorage="nomeLocalStorage" :propsContainer="propsContainer" />
    <Table :nomeLocalStorage="nomeLocalStorage" />
  </div>
</template>

<script>
import Login from "./components/Login/Login.vue";
import Table from "./components/Table/Table.vue";
import { apiBanco } from "./services/api.js";
import { verificarLocalStorage } from "./services/funcoesLocalStorage.js";

let nomeLocalStorage = "convert-on";

export default {
  name: "App",
  components: {
    Login,
    Table
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
      verificarLocalStorage(nomeLocalStorage);

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
          /* alert("Bem Vindo!"); */
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
    })();
    return {};
  }
};
</script>

<style>
html {
  background-color: #a9e3ea;
}

body {
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100vh;
  max-height: 1000px;
  background-color: #a9e3ea;
}
</style>