<template>
  <div id="app">
    <Login :nomeLocalStorage="nomeLocalStorage" :propsContainer="propsContainer" />
  </div>
</template>

<script>
import Login from "./components/Login/Login.vue";

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

  console.log(valorLocalStorage);

  const { token } = valorLocalStorage;

  if (token !== "") {
    alert("Conectado");
    propsContainer = "none";
  }
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
