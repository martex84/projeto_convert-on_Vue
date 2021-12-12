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
          <span v-bind:style="{display: this.style.span.valorbase}">Incluir!</span>
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">$</span>
          <input
            type="text"
            class="form-control"
            aria-label="Amount (to the nearest dollar)"
            v-model="valueInput.inicial"
          />
        </div>
        <div class="containerConverter__informacaoInput d-flex justify-content-between w-100">
          <label>Tipo de conversão</label>
          <span v-bind:style="{display: this.style.span.conversao}">Incluir!</span>
        </div>
        <select
          class="containerConverter__select form-select mb-4"
          aria-label="Default select example"
          v-model="valueInput.type"
        >
          <option selected value="0">Converter De/Para</option>
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
          @click="verificaCampos"
        >Converter</button>
        <div class="input-group mb-3">
          <span class="input-group-text" id="input-result">Resultado</span>
          <input
            type="text"
            class="containerConverter__input--disabled form-control"
            aria-label="Input Resultado"
            aria-describedby="input-result"
            disabled
            v-model="valueInput.final"
          />
        </div>
      </div>
      <div class="containerConteudo__containerTabela d-flex align-items-center flex-column">
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
              <td>{{this.valueTable.matrix[paginacao.atual][0][0]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][0][1]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][0][2]}}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>{{this.valueTable.matrix[paginacao.atual][1][0]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][1][1]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][1][2]}}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>{{this.valueTable.matrix[paginacao.atual][2][0]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][2][1]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][2][2]}}</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>{{this.valueTable.matrix[paginacao.atual][3][0]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][3][1]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][3][2]}}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>{{this.valueTable.matrix[paginacao.atual][4][0]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][4][1]}}</td>
              <td>{{this.valueTable.matrix[paginacao.atual][4][2]}}</td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item active">
              <a
                class="page-link"
                @click="verificaPaginacao(0)"
                v-bind:class="[paginacao.class.campo1.geral, paginacao.class.campo1.statusAtual]"
              >1</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                @click="verificaPaginacao(1)"
                v-bind:class="[paginacao.class.campo2.geral, paginacao.class.campo2.statusAtual]"
              >2</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                @click="verificaPaginacao(2)"
                v-bind:class="[paginacao.class.campo3.geral, paginacao.class.campo3.statusAtual]"
              >3</a>
            </li>
            <li class="page-item">
              <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="modal" tabindex="-1" v-bind:style="{display: style.mensagem}">
      <div class="modal-dialog modal-dialog-centered position-relative">
        <div class="modal-content">
          <div class="containerModal__body--table modal-body">
            <div class="d-flex flex-row-reverse">
              <button
                type="button"
                class="containerModal__ButtonClose--table btn-close position-absolute"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click="fecharMessage"
              ></button>
            </div>
            <div>
              <h4 class="h4 text-center">{{bodyMensagem}}</h4>
            </div>
            <div class="containerModal__containerButtonClear--table d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-info"
                data-bs-dismiss="modal"
                @click="limparHistorico"
              >Limpar</button>
            </div>
          </div>
        </div>
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
        type: "0",
        final: ""
      },
      style: {
        span: {
          valorbase: "none",
          conversao: "none"
        },
        mensagem: "none"
      },
      bodyMensagem:
        "O limite atual para o histórico foi alcançado, clique no botão limpar para recomeçar!",
      paginacao: {
        atual: 0,
        class: {
          campo1: {
            geral: "containerTabela__paginacao--ativo",
            statusAtual: "containerTabela__paginacao--backgoundPaginacaoAtual"
          },
          campo2: {
            geral: "containerTabela__paginacao--desativo",
            statusAtual: "containerTabela__paginacao--backgoundPaginacaoEspera"
          },
          campo3: {
            geral: "containerTabela__paginacao--desativo",
            statusAtual: "containerTabela__paginacao--backgoundPaginacaoEspera"
          }
        }
      },
      valueTable: {
        pages: "1",
        matrix: [
          [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
          ]
        ]
      }
    };
  },
  methods: {
    verificaCampos() {
      let campoVazio = true;

      this.style.span.valorbase = "none";
      this.style.span.conversao = "none";

      if (this.valueInput.inicial === "") {
        campoVazio = false;

        this.style.span.valorbase = "inline";
      }

      if (this.valueInput.type === "0") {
        campoVazio = false;

        this.style.span.conversao = "inline";
      }

      if (campoVazio === true) {
        this.converterValores();
      }
    },
    converterValores() {
      (async () => {
        const horaAtual = new Date().getHours();
        const { inicial, type } = this.valueInput;
        let valorFinal = "";
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
              USD: "1.131676",
              BRL: "6.351515",
              CAD: "1.131676"
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
            valorFinal = verificacaoAutomaticaDaConversao(
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
            valorFinal = verificacaoAutomaticaDaConversao(
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
            valorFinal = verificacaoAutomaticaDaConversao(
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
            valorFinal = verificacaoAutomaticaDaConversao(
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
            valorFinal = verificacaoAutomaticaDaConversao(
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
            valorFinal = verificacaoAutomaticaDaConversao(
              this.nomeLocalStorage,
              tipoValores.processoConversao,
              inicial,
              tipoValores.initial,
              tipoValores.final
            );
            break;
        }

        this.valueInput.final = valorFinal;

        //Salva os valores dentro da matriz
        this.valueTable.matrix.forEach(
          (grupoPrincipal, indexGrupoPrincipal) => {
            let valorMatrizSalvo = false;

            if (valorMatrizSalvo === false) {
              grupoPrincipal.forEach(
                (grupoSecundario, indexGrupoSecundario) => {
                  if (valorMatrizSalvo === false) {
                    let verificaCampoLimpo = false;

                    grupoSecundario.forEach(valor => {
                      if (valor === "") verificaCampoLimpo = true;
                      else verificaCampoLimpo = false;
                    });

                    if (verificaCampoLimpo === true) {
                      valorMatrizSalvo = true;

                      this.valueTable.matrix[indexGrupoPrincipal][
                        indexGrupoSecundario
                      ][0] = inicial;

                      this.valueTable.matrix[indexGrupoPrincipal][
                        indexGrupoSecundario
                      ][1] = valorFinal;

                      this.valueTable.matrix[indexGrupoPrincipal][
                        indexGrupoSecundario
                      ][2] = `${tipoValores.initial} > ${tipoValores.final}`;

                      //Cria uma nova paginação
                      if (
                        indexGrupoSecundario - 1 ===
                          this.valueTable.matrix[indexGrupoPrincipal][
                            indexGrupoSecundario
                          ].length &&
                        indexGrupoPrincipal <= 1
                      ) {
                        this.valueTable.matrix.push([
                          ["", "", ""],
                          ["", "", ""],
                          ["", "", ""],
                          ["", "", ""],
                          ["", "", ""]
                        ]);
                      }

                      //Reseta os campos
                      this.valueInput.inicial = "";
                    }

                    if (
                      indexGrupoPrincipal === 2 &&
                      indexGrupoSecundario === 4
                    ) {
                      this.style.mensagem = "block";
                    }
                  }
                }
              );
            }
          }
        );
      })();
    },
    verificaPaginacao(pagina) {
      const tamanhoMatrix = this.valueTable.matrix.length;
      if (tamanhoMatrix > 1) {
        if (pagina <= tamanhoMatrix - 1) {
          let cont = 1;

          this.paginacao.atual = pagina;

          while (cont <= tamanhoMatrix) {
            if (cont - 1 === pagina) {
              this.paginacao.class[`campo${cont}`].statusAtual =
                "containerTabela__paginacao--backgoundPaginacaoAtual";
            } else {
              this.paginacao.class[`campo${cont}`].statusAtual =
                "containerTabela__paginacao--backgoundPaginacaoEspera";
            }

            cont++;
          }
        }
      }
      /* console.log(pagina); */
    },
    fecharMessage() {
      this.style.mensagem = "none";
    },
    limparHistorico() {
      this.valueTable = {
        pages: "1",
        matrix: [
          [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
          ]
        ]
      };

      this.paginacao = {
        atual: 0,
        class: {
          campo1: {
            geral: "containerTabela__paginacao--ativo",
            statusAtual: "containerTabela__paginacao--backgoundPaginacaoAtual"
          },
          campo2: {
            geral: "containerTabela__paginacao--desativo",
            statusAtual: "containerTabela__paginacao--backgoundPaginacaoEspera"
          },
          campo3: {
            geral: "containerTabela__paginacao--desativo",
            statusAtual: "containerTabela__paginacao--backgoundPaginacaoEspera"
          }
        }
      };
    }
  },
  beforeUpdate() {
    //Ira verificar se o campo Valor Base contem apenas numeros
    (() => {
      const valoresPerimitidos = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "."
      ];
      const valorBase = this.valueInput.inicial;
      let valorRetorno = "";
      let contagemPonto = 0;

      if (valorBase !== "") {
        for (let valorBaseCaracter of valorBase) {
          for (let valorConsulta of valoresPerimitidos) {
            if (valorBaseCaracter === valorConsulta) {
              if (valorConsulta === ".") {
                if (contagemPonto === 0) {
                  contagemPonto++;

                  valorRetorno = `${valorRetorno}${valorConsulta}`;
                }
              } else {
                valorRetorno = `${valorRetorno}${valorConsulta}`;
              }
            }
          }
        }
      }

      this.valueInput.inicial = valorRetorno;
    })();
  },
  updated() {
    //Função para apagar o campo Resultado ao iniciar o Valor Base
    (() => {
      let valorInical = this.valueInput.inicial;
      if (valorInical.length === 1 && this.valueInput.final !== "") {
        this.valueInput.final = "";
      }
    })();

    //Muda a propriedade da paginação quando ela é passivel de utilização
    (() => {
      const tamanhoMatrix = this.valueTable.matrix.length;

      if (tamanhoMatrix <= 3) {
        let cont = 1;
        while (cont <= tamanhoMatrix) {
          if (
            this.paginacao.class[`campo${cont}`].geral ===
            "containerTabela__paginacao--desativo"
          ) {
            this.paginacao.class[`campo${cont}`].geral =
              "containerTabela__paginacao--ativo";
          }

          cont++;
        }
      }
    })();
  }
};
</script>

<style scoped>
@import "./style.css";
</style>