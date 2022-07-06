import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueComposition from '@vue/composition-api'
import vuetify from './plugins/vuetify'
import { VueMaskDirective } from 'v-mask'
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

Vue.use(VueComposition)
Vue.use(vuetify)
Vue.directive('mask', VueMaskDirective)
Vue.component('ValidationProvider', ValidationProvider)

extend('required', {
  ...required,
  message: 'Este campo não pode ser vazio'
})

extend('min', value => {
  return value.length < 9 ? 'Este campo requer o mínimo de 8 números' : true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
