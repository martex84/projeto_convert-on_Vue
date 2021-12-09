<template>
  <div class="container-login">
    <div class="modal modalOn" tabindex="-1" v-bind:style="{ display: valorDiplayLogin.display}">
      <div class="modal-dialog">
        <div class="modal-content container-modalContent-login">
          <div class="modal-header borderTransparent">
            <h3 class="modal-title text-center" style="width:100%">Convert on.</h3>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between login_identificador-tipo-input">
              <label>Login</label>
              <span>Incluir!</span>
            </div>
            <input
              class="input-login borderTransparent"
              type="text"
              placeholder="Insira seu email"
              v-model="input.valorLogin"
            />
            <div class="d-flex justify-content-between mt-4 login_identificador-tipo-input">
              <label>Senha</label>
              <span>Incluir!</span>
            </div>
            <input
              class="input-login borderTransparent"
              type="password"
              placeholder="Insira sua senha"
              v-model="input.valorSenha"
            />
          </div>
          <div class="modal-footer borderTransparent">
            <button
              type="buttom"
              class="btn login_botao"
              style="margin: auto"
              v-on:click="console"
            >Conectar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      valorDiplayLogin: {
        display: "grid"
      },
      input: {
        valorLogin: "",
        valorSenha: ""
      }
    };
  },
  methods: {
    console() {
      /* this.consoleLog(this.input.valorLogin); */

      (() => {
        console.log(this.input.valorLogin);
      })();
    },
    consoleLog: valor => {
      console.log(valor);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
</style>
