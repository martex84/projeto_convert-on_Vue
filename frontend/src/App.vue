<template>
  <div id="app">
    <Login :nomeLocalStorage="nomeLocalStorage" :propsContainer="propsContainer" />
  </div>
</template>

<script>
import Login from "./components/Login/Login.vue";
import { apiBanco } from "./services/api.js";

let nomeLocalStorage = "convert-on";
let propsContainer = "grid";

//Cria local storage caso não tenha
if (!localStorage.getItem(nomeLocalStorage)) {
  localStorage.setItem(
    nomeLocalStorage,
    JSON.stringify({
      token: "",
      tabela: ""
    })
  );
} else {
  let valorLocalStorage = JSON.parse(localStorage.getItem(nomeLocalStorage));

  const { token } = valorLocalStorage;

  (async () => {
    const resultadoPesquisa = await apiBanco
      .get(`/token?token=${token}`)
      .then(res => {
        return res.data;
      })
      .catch(err => console.log(err));

    if (resultadoPesquisa === true) {
      alert("Bem Vindo!");
      propsContainer = "none";
    }
    //Caso o token esteja errado irá zerar os valores do LocalStorage
    else {
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

export default {
  name: "App",
  components: {
    Login
  },
  data() {
    return {
      nomeLocalStorage,
      propsContainer
    };
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
