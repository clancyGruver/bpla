import Vue from 'vue';
window.Vue = Vue;

import axios from 'axios';
import router from './routes/router';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false;

// set jwt
Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
    el:'#app',
    router,
    store,    
    beforeCreate () {
        if (!store.state.isLogged) {
            router.push('/login')
        }
    }    
});
