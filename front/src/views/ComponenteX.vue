<template>
<div>
<p>Renderizado via tag p , dentro do ComponenteX</p>
<slot name="nomeQueDeiAoSlot" :nomeChaveDataComponenteX = "nomeChaveDataComponenteX"></slot>
</div>
</template>

<script>
import {
  defineComponent,
  reactive,
  toRefs
} from '@vue/composition-api'

export default defineComponent({
  setup () {
    const state = reactive({
      nomeChaveDataComponenteX: 'valor atribuído à chave em ComponenteX'
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
