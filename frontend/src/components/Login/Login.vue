<template>
  <div class="containerLogin position-absolute" v-bind:style="{display:propsContainer}">
    <div class="modal modalOn" tabindex="-1" style="display:grid">
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
              class="containerLogin_input borderTransparent"
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
              class="containerLogin_input borderTransparent"
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
    <div class="modal" tabindex="-1" v-bind:style="{display: style.modelLoginBancoDados}">
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
              <h4 class="h4 text-center">{{bodyMensagem}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiBanco } from "../../services/api.js";
import { criarLocalStorage } from "../../services/funcoesLocalStorage.js";

export default {
  name: "Login",
  props: {
    nomeLocalStorage: String,
    propsContainer: String
  },
  data() {
    return {
      style: {
        modelLoginBancoDados: "none",
        span: {
          displayLogin: "none",
          displaySenha: "none"
        }
      },
      input: {
        valorLogin: "",
        valorSenha: ""
      },
      bodyMensagem: "Conexão efetuada com sucesso!"
    };
  },
  methods: {
    verificarLogin() {
      this.style.span.displayLogin = "none";
      this.style.span.displaySenha = "none";

      if (this.input.valorLogin === "") {
        this.style.span.displayLogin = "inline";
      }

      if (this.input.valorSenha === "") {
        this.style.span.displaySenha = "inline";
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

        //Se todos os valores forem cumpridos irá verificar a presença da informação no banco de dados
        if (presencaModeloLogin === true && contagemModeloLogin === 1) {
          let localStoragePresente = false;

          //Ira verificar o local storage está completo
          if (localStorage.getItem(this.nomeLocalStorage))
            localStoragePresente = true;

          if (
            localStoragePresente === true &&
            localStorage.getItem(this.nomeLocalStorage).token
          ) {
            localStoragePresente = true;
          } else localStoragePresente = false;

          //Cria o local storage caso tenha algume erro
          if (localStoragePresente === false) {
            criarLocalStorage(this.nomeLocalStorage);
          }

          //Inicia processo de verificação de login e criacao local de token
          let valorLocalStorage = JSON.parse(
            localStorage.getItem(this.nomeLocalStorage)
          );

          (async () => {
            const resultadoPesquisaUsuario = await apiBanco
              .get(
                `/user?login=${this.input.valorLogin}&senha=${this.input.valorSenha}`
              )
              .catch(err => console.log(err));

            if (resultadoPesquisaUsuario.data.error !== undefined) {
              this.bodyMensagem = `Erro ${resultadoPesquisaUsuario.data.error} -- Usuário ou senha inválida!`;

              this.style.modelLoginBancoDados = "block";
            } else if (resultadoPesquisaUsuario.data.token !== undefined) {
              valorLocalStorage.token = resultadoPesquisaUsuario.data.token;

              localStorage.setItem(
                this.nomeLocalStorage,
                JSON.stringify(valorLocalStorage)
              );

              this.style.modelLoginBancoDados = "block";
            }
          })();
        }
      } else {
        this.style.span.displayLogin = "inline";
      }
    },
    fecharMessage() {
      this.style.modelLoginBancoDados = "none";

      this.bodyMensagem = "Conexão efetuada com sucesso!";

      this.propsContainer = "none";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "./style.css";
</style>
