<template>
  <div id="app" class="d-flex justify-content-center align-items-center position-relative">
    <Login :nomeLocalStorage="nomeLocalStorage" :propsContainer="style.propsContainer" />
    <Table :nomeLocalStorage="nomeLocalStorage" />
    <div class="modal" tabindex="-1" v-bind:style="{display: style.modelLogin}">
      <div class="modal-dialog modal-dialog-centered position-relative">
        <div class="modal-content">
          <div class="containerModal__body modal-body">
            <div class="d-flex flex-row-reverse">
              <button
                type="button"
                class="btn-close position-absolute"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="fecharMessage"
              ></button>
            </div>
            <div>
              <h4 class="h4 text-center">Token confirmado,</h4>
              <h4 class="h4 text-center" style="margin-bottom: 0">bem vindo de volta!</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* import Login from "./components/Login/Login.vue"; */
import Table from "./components/Table/Table.vue";
import { apiBanco } from "./services/api.js";
import { verificarLocalStorage } from "./services/funcoesLocalStorage.js";

let nomeLocalStorage = "convert-on";

export default {
  name: "App",
  components: {
    /* Login, */
    Table
  },
  data() {
    return {
      nomeLocalStorage,
      style: {
        propsContainer: "grid",
        modelLogin: "none"
      }
    };
  },
  methods: {
    fecharMessage() {
      this.style.modelLogin = "none";
    }
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
          .catch(err => console.error(err));

        if (resultadoPesquisa.tokenVerification === true) {
          if (this.style.propsContainer !== "none") {
            this.style.modelLogin = "block";

            this.style.propsContainer = "none";
          }
        }
        //Caso o token esteja errado irá zerar os valores do LocalStorage
        else {
          this.style.propsContainer = "grid";
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

.containerModal__body {
  border: 2px solid black;
  background-color: #37afc8;
  color: #fff;
}

.containerModal__body button {
  top: 3px;
  right: 5px;
}
</style>