import Vue from 'vue'
import App from './App.vue'
import Mobile from './Mobile'

var width = document.documentElement.clientWidth;
Vue.config.productionTip = false

new Vue({
  render: h => h(width>500?App:Mobile)
}).$mount('#app')
