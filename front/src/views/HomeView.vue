<template>
  <v-main>
  <v-card>
    <v-tabs
      background-color="deep-purple accent-4"
      center-active
      dark
    >
      <v-tab
      >API Pública</v-tab>
      <v-tab>Rest Api</v-tab>
      <v-tab>Implementar</v-tab>
      <v-tab>Implementar</v-tab>
    </v-tabs>
  </v-card>
    <v-container>
    <v-card>
      <v-container>
      <h2>Manipulando cep de uma API pública </h2>
       </v-container>

  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="10"
          md="9"
        >
        <ValidationProvider rules="required|min" v-slot="{ errors }">
          <v-text-field
            v-model="inputCep"
            outlined
            v-mask="'#####-###'"
            label="Digite o cep"
            required
          ></v-text-field>
          <span style="color:red;"><strong>{{ errors[0] }}</strong></span>
          <span v-if="renderDontExistCep" style="color:red;">Cep não existente</span>
        </ValidationProvider>

        </v-col>
        <v-col>
          <v-btn
      class="mx-2"
      fab
      dark
      color="indigo"
      @click="getCEP"
    >
      <v-icon dark>
        mdi-plus
      </v-icon>
    </v-btn>
        </v-col>
      </v-row>
       </v-container>
  </v-form>

    <h2>CEP: {{dataCep.cep}}</h2>
    <h2>Rua: {{dataCep.logradouro}}</h2>
    <h2>Bairro: {{dataCep.bairro}}</h2>
    <h2>Cidade: {{dataCep.localidade}}</h2>

    <template>
  </template>
    </v-card>
    </v-container>
  </v-main>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import axios from 'axios'

export default defineComponent({
  setup () {
    const state = reactive({
      inputCep: '',
      renderDontExistCep: false,
      dataCep: {},
      headers: {
        cep: 'CEP',
        rua: 'Rua',
        bairro: 'Bairro',
        cidade: 'Cidade'
      }
    })

    function clearInput () {
      state.inputCep = ''
    }

    async function getCEP () {
      try {
        const result = await axios({
          url: `http://viacep.com.br/ws/${state.inputCep}/json/`,
          method: 'GET'
        })
        state.dataCep = result.data
        console.log(result.data)
        clearInput()
        if (state.dataCep.erro) {
          state.renderDontExistCep = true
        }
      } catch (error) {
        clearInput()
        console.log(error)
      }
    }

    return {
      ...toRefs(state),
      getCEP,
      clearInput
    }
  }
})
</script>
