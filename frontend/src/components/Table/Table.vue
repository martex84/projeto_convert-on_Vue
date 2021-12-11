<template>
  <div
    class="containerTable container-fluid d-flex justify-content-center align-items-center flex-column"
  >
    <div
      class="table__containerTitulo container d-flex justify-content-center align-items-center flex-column h-25 mb-5 mt-3"
    >
      <h1 class="h1 mb-4">Conversor On.</h1>
      <h4 clas="h4">Escolha um valor inicial e para qual tipo ele será convertido</h4>
    </div>
    <div
      class="container table__containerConteudo d-flex justify-content-center align-items-center flex-wrap"
    >
      <div
        class="containerConteudo__containerConverter d-flex justify-content-center align-items-center flex-column"
      >
        <div class="containerConverter__informacaoInput d-flex justify-content-between w-100">
          <label>Valor Base</label>
          <span>Incluir!</span>
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">$</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            v-model="valueInput.inicial"
          />
          <span class="input-group-text">.00</span>
        </div>
        <div class="containerConverter__informacaoInput d-flex justify-content-between w-100">
          <label>Tipo de conversão</label>
          <span>Incluir!</span>
        </div>
        <select
          class="form-select mb-4"
          aria-label="Default select example"
          v-model="valueInput.type"
        >
          <option selected>Converter De/Para</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <button
          type="button"
          class="containerConverter__button btn mb-4"
          @click="converterValores"
        >Converter</button>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Resultado</span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            v-model="valueInput.final"
          />
        </div>
      </div>
      <div class="containerConteudo__containerTabela d-flex align-items-center flex-column ms-auto">
        <h3 class="h3">Histórico de Conversões</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="containerTabela__titulo--cor">#</th>
              <th scope="col" class="containerTabela__titulo--cor">Valor Inicial</th>
              <th scope="col" class="containerTabela__titulo--cor">Valor Final</th>
              <th scope="col" class="containerTabela__titulo--cor">Tipo de Conv.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>15</td>
              <td>30</td>
              <td>Br>Dolar</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>15</td>
              <td>30</td>
              <td>Br>Dolar</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>15</td>
              <td>30</td>
              <td>Br>Dolar</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>15</td>
              <td>30</td>
              <td>Br>Dolar</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>15</td>
              <td>30</td>
              <td>Br>Dolar</td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { verificarLocalStorage } from "../../services/funcoesLocalStorage.js";

export default {
  name: "Table",
  props: {
    nomeLocalStorage: String
  },
  data() {
    return {
      valueInput: {
        inicial: "",
        type: "",
        final: ""
      }
    };
  },
  methods: {
    converterValores() {
      (async () => {
        const horaAtual = new Date().getHours();

        verificarLocalStorage(this.nomeLocalStorage);

        let valorLocalStorage = JSON.parse(
          localStorage.getItem(this.nomeLocalStorage)
        );

        //Verificar se já se passou uma hora ou se o localStorage está
        if (
          valorLocalStorage.conversor === "" ||
          valorLocalStorage.conversor.hours !== horaAtual
        ) {
          valorLocalStorage.conversor = {
            hours: horaAtual,
            dataBase: {
              USD: "",
              AUD: "",
              CAD: "",
              PLN: "",
              MXN: ""
            }
          };

          await fetch(
            `http://api.exchangeratesapi.io/v1/latest?access_key=8b14f3253aa22050e84a0dfd5e2effb6& symbols=USD,AUD,CAD,PLN,MXN`
          )
            .then(res => res.json())
            .then(json => {
              const valorAPI = json;

              //Inclementa o valor da API dentro do localStorage
              Object.keys(valorLocalStorage.conversor.dataBase).forEach(
                valorDataBase => {
                  Object.keys(valorAPI.rates).forEach(valorLocalApi => {
                    if (valorDataBase === valorLocalApi) {
                      valorLocalStorage.conversor.dataBase[`${valorDataBase}`] =
                        valorAPI.rates[`${valorLocalApi}`];
                    }
                  });
                }
              );

              console.log(valorLocalStorage);

              localStorage.setItem(
                this.nomeLocalStorage,
                JSON.stringify(valorLocalStorage)
              );
            });
        } else {
          console.log("Banco está atualizado!");
        }

        /*
          
        */
      })();
    }
  }
};
</script>

<style scoped>
@import "./style.css";
</style>