<template>
  <div
    class="containerTable container container-fluid d-flex justify-content-center align-items-center flex-column"
  >
    <div
      class="table__containerTitulo container d-flex justify-content-center align-items-center flex-column h-25"
    >
      <h1 class="h1">Conversor On.</h1>
      <h4 clas="h4">Escolha um valor inicial e para qual tipo ele será convertido</h4>
    </div>
    <div
      class="container table__containerConteudo d-flex justify-content-center align-items-center"
    >
      <div
        class="containerConteudo__containerConverter container d-flex justify-content-center align-items-center flex-column"
      >
        <div class="containerConverter__informacaoInput d-flex justify-content-between w-100">
          <label>Valor Base</label>
          <span>Incluir!</span>
        </div>
        <div class="input-group mb-4">
          <span class="input-group-text">$</span>
          <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
          <span class="input-group-text">.00</span>
        </div>
        <div class="containerConverter__informacaoInput d-flex justify-content-between w-100">
          <label>Valor Base</label>
          <span>Incluir!</span>
        </div>
        <select class="form-select mb-4" aria-label="Default select example">
          <option selected>Converter De/Para</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <button type="button" class="containerConverter__button btn mb-4">Primary</button>
        <div class="input-group mb-3">
          <span class="input-group-text" id="inputGroup-sizing-default">Resultado</span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
          />
        </div>
      </div>
      <div
        class="containerConteudo__containerTabela container d-flex align-items-center flex-column h-100"
      >
        <h3 class="h3">Histórico de Conversões</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Valor Inicial</th>
              <th scope="col">Valor Final</th>
              <th scope="col">Tipo de Conv.</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>15</td>
              <td>30</td>
              <td>Br>Dolar</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
@import "./style.css";
</style>