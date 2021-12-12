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
          <option value="1">BRL > USD</option>
          <option value="2">USD > BRL</option>
          <option value="3">BRL > CAD</option>
          <option value="4">CAD > BRL</option>
          <option value="5">CAD > USD</option>
          <option value="6">USD > CAD</option>
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
              <td>{{this.valueTable.matrix[0][0][0]}}</td>
              <td>{{this.valueTable.matrix[0][0][1]}}</td>
              <td>{{this.valueTable.matrix[0][0][2]}}</td>
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
import {
  catalogoBaseConversaoMoedas,
  verificacaoAutomaticaDaConversao
} from "../../services/processosMatematicos.js";

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
      },
      valueTable: {
        pages: "1",
        matrix: [
          [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
          ]
        ]
      }
    };
  },
  methods: {
    converterValores() {
      (async () => {
        const horaAtual = new Date().getHours();
        const { inicial, type } = this.valueInput;
        let tipoValores = {
          initial: "",
          final: "",
          processoConversao: {
            USD_BRL: "",
            USD_CAD: "",
            CAD_BRL: ""
          }
        };

        verificarLocalStorage(this.nomeLocalStorage);

        let valorLocalStorage = JSON.parse(
          localStorage.getItem(this.nomeLocalStorage)
        );

        //Verificar se já se passou uma hora ou se o localStorage está
        if (
          valorLocalStorage.conversor === "" ||
          valorLocalStorage.conversor.hours !== horaAtual
        ) {
          let tiposParaConversão = ["BRL", "USD", "CAD"];
          let keyAPI = "8b14f3253aa22050e84a0dfd5e2effb6";

          valorLocalStorage.conversor = {
            hours: horaAtual,
            dataBase: {
              USD: "",
              BRL: "",
              CAD: ""
            }
          };

          await fetch(
            `http://api.exchangeratesapi.io/v1/latest?access_key=${keyAPI}&symbols=${tiposParaConversão[0]},${tiposParaConversão[1]},${tiposParaConversão[2]}`
          )
            .then(res => res.json())
            .then(json => {
              const { rates } = json;
              const { dataBase } = valorLocalStorage.conversor;

              //Inclementa o valor da API dentro do localStorage
              Object.keys(dataBase).forEach(valorDataBase => {
                Object.keys(rates).forEach(valorLocalApi => {
                  if (valorDataBase === valorLocalApi) {
                    //Salva o valor da Api no respectivo campo da database
                    dataBase[`${valorDataBase}`] = rates[`${valorLocalApi}`];
                  }
                });
              });

              localStorage.setItem(
                this.nomeLocalStorage,
                JSON.stringify(valorLocalStorage)
              );
            });
        }

        //Ira processar os valores e decidir qual a ordem correta
        tipoValores.processoConversao = catalogoBaseConversaoMoedas(
          tipoValores.processoConversao,
          this.nomeLocalStorage
        );

        //Verificar o tipo de conversão
        switch (type) {
          case "1":
            tipoValores.initial = "BRL";
            tipoValores.final = "USD";
            this.valueInput.final = verificacaoAutomaticaDaConversao(
              this.nomeLocalStorage,
              tipoValores.processoConversao,
              inicial,
              tipoValores.initial,
              tipoValores.final
            );
            break;
          case "2":
            tipoValores.initial = "USD";
            tipoValores.final = "BRL";
            this.valueInput.final = verificacaoAutomaticaDaConversao(
              this.nomeLocalStorage,
              tipoValores.processoConversao,
              inicial,
              tipoValores.initial,
              tipoValores.final
            );
            break;
          case "3":
            tipoValores.initial = "BRL";
            tipoValores.final = "CAD";
            this.valueInput.final = verificacaoAutomaticaDaConversao(
              this.nomeLocalStorage,
              tipoValores.processoConversao,
              inicial,
              tipoValores.initial,
              tipoValores.final
            );
            break;
          case "4":
            tipoValores.initial = "CAD";
            tipoValores.final = "BRL";
            this.valueInput.final = verificacaoAutomaticaDaConversao(
              this.nomeLocalStorage,
              tipoValores.processoConversao,
              inicial,
              tipoValores.initial,
              tipoValores.final
            );
            break;
          case "5":
            tipoValores.initial = "CAD";
            tipoValores.final = "USD";
            this.valueInput.final = verificacaoAutomaticaDaConversao(
              this.nomeLocalStorage,
              tipoValores.processoConversao,
              inicial,
              tipoValores.initial,
              tipoValores.final
            );
            break;
          case "6":
            tipoValores.initial = "USD";
            tipoValores.final = "CAD";
            this.valueInput.final = verificacaoAutomaticaDaConversao(
              this.nomeLocalStorage,
              tipoValores.processoConversao,
              inicial,
              tipoValores.initial,
              tipoValores.final
            );
            break;
        }
      })();
    },
    consoleLocal() {
      console.log();
    }
  }
};
</script>

<style scoped>
@import "./style.css";
</style>