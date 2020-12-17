import Vue from 'vue'
import App from './App.vue'
import Router from '../router/router'
import Store from '../store/store'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    router: Router,
    store: Store,
    render: h => h(App)
  }).$mount('#app')
})
