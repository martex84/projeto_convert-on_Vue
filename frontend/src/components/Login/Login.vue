<template>
  <div class="container-login">
    <div class="modal modalOn" tabindex="-1" v-bind:style="{ display: style.container.display}">
      <div class="modal-dialog">
        <div class="modal-content container-modalContent-login">
          <div class="modal-header borderTransparent">
            <h3 class="modal-title text-center" style="width:100%">Convert on.</h3>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between login_identificador-tipo-input">
              <label>Login</label>
              <span v-bind:style="{display:style.span.displayLogin}">Incluir!</span>
            </div>
            <input
              class="input-login borderTransparent"
              type="email"
              pattern=".+@.+\.com"
              placeholder="Insira seu email"
              v-model="input.valorLogin"
            />
            <div class="d-flex justify-content-between mt-4 login_identificador-tipo-input">
              <label>Senha</label>
              <span v-bind:style="{display:style.span.displaySenha}">Incluir!</span>
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
              @click="verificarLogin"
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
      style: {
        container: {
          display: "grid"
        },
        span: {
          displayLogin: "none",
          displaySenha: "none"
        }
      },
      input: {
        valorLogin: "",
        valorSenha: ""
      }
    };
  },
  methods: {
    verificarLogin() {
      this.style.span.displayLogin = "none";
      this.style.span.displaySenha = "none";

      if (this.input.valorLogin === "") {
        this.style.span.displayLogin = "inline";
        return;
      }

      if (this.input.valorSenha === "") {
        this.style.span.displaySenha = "inline";
        return;
      }

      if (this.input.valorLogin !== "" && this.input.valorSenha !== "") {
        let presencaModeloLogin = false;
        let contagemModeloLogin = 0;

        for (let valor of this.input.valorLogin) {
          if (valor === "@") {
            presencaModeloLogin = true;

            contagemModeloLogin += 1;
          }
        }

        if (presencaModeloLogin === true && contagemModeloLogin === 1) {
          alert("Conectado");
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
</style>
