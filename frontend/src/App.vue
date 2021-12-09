<template>
  <div id="app">
    <Login />
  </div>
</template>

<script>
import Login from "./components/Login/Login.vue";

export default {
  name: "App",
  components: {
    Login
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
