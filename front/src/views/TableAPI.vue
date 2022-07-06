<template>
  <div>
    <v-btn color="primary" dark @click="abrirDialog"> Adicionar Pessoa </v-btn>

<ComponenteX>
      <template #nomeQueDeiAoSlot="{nomeChaveDataComponenteX}" >
        Renderizando via slot: {{nomeChaveDataComponenteX}}
      </template>
    </ComponenteX>

<!-- DIALOG PARA ADICIONAR PESSOA -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Adicionar Pessoa</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="pessoa.nome" label="Pessoa*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="pessoa.idade" label="Idade*"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Fechar
          </v-btn>
          <v-btn color="blue darken-1" text @click="salvarPessoa">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="pessoas"
      :items-per-page="10"
      class="elevation-1"
    >
   <template v-slot:[`item.actions`]="{ item }" >
     <v-icon small class="mr-2"
        @click="botaoEditarPessoa(item)"
      >
        mdi-pencil
      </v-icon>

     <!-- DIALOG PARA EDITAR USUARIO -->
      <v-dialog v-model="editarDialog">
        <v-card>
        <v-card-title>
          <span class="text-h5">Editar Pessoa</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row >
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="pessoa.nome" label="Pessoa*" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="pessoa.idade" label="Idade*"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="editarDialog = false">
            Fechar
          </v-btn>
          <v-btn color="blue darken-1" text @click="editarPessoa">
            Salvar
          </v-btn>
        </v-card-actions>

      </v-card>
      </v-dialog>

      <!-- DIALOG PARA DELETAR USUARIO -->
     <v-icon
        small
        @click="dialogDelete= true"
      >
        mdi-delete
      </v-icon>
      <v-dialog v-model="dialogDelete">
        <v-card>
          <h3>Você deseja apagar este item?</h3>
          <v-btn @click="deletarPessoa(item)">Sim</v-btn>
          <v-btn @click="dialogDelete = false">Não</v-btn>
        </v-card>
      </v-dialog>

   </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted
} from '@vue/composition-api'
import axios from 'axios'
import ComponenteX from '../views/ComponenteX.vue'

export default defineComponent({
  components: {
    ComponenteX
  },
  setup () {
    const state = reactive({
      pessoas: [],
      headers: [
        {
          text: 'Nome da Pessoa',
          align: 'start',
          sortable: false,
          value: 'nome'
        },
        {
          text: 'Idade',
          align: 'start',
          sortable: false,
          value: 'idade'
        },
        {
          text: 'Editar/Apagar',
          align: 'start',
          sortable: false,
          value: 'actions'
        }
      ],

      dialog: false,
      dialogDelete: false,
      editarDialog: false,
      pessoa: {}
    })

    function abrirDialog () {
      state.pessoa = {}
      state.dialog = true
    }

    async function getData () {
      try {
        const res = await axios({
          url: 'http://localhost:3000/list',
          method: 'get'
        })

        state.pessoas = res.data
      } catch (error) {
        console.log(error)
      }
    }

    async function salvarPessoa () {
      try {
        await axios({
          url: 'http://localhost:3000/create',
          method: 'post',
          data: state.pessoa
        })
        await getData()
        state.dialog = false
      } catch (error) {
        console.log(error)
      }
    }

    function botaoEditarPessoa (item) {
      state.pessoa = Object.assign({}, item)
      state.editarDialog = true
    }

    async function editarPessoa () {
      try {
        const res = await axios({
          url: 'http://localhost:3000/update',
          method: 'put',
          data: state.pessoa
        })
        state.pessoa = res.data
        await getData()
        state.editarDialog = false
      } catch (error) {
        console.log(error)
      }
    }

    async function deletarPessoa (item) {
      try {
        await axios({
          url: 'http://localhost:3000/delete',
          method: 'delete',
          data: Object.assign({}, item)
        })
        await getData()
        state.dialogDelete = false
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(async () => {
      await getData()
    })

    return {
      ...toRefs(state),
      abrirDialog,
      salvarPessoa,
      editarPessoa,
      deletarPessoa,
      botaoEditarPessoa
    }
  }
})
</script>
