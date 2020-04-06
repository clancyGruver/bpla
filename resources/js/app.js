import Vue from 'vue';
import VueRouter from 'vue-router';
import VModal from 'vue-js-modal';
import VueAlert from '@vuejs-pt/vue-alert';

window.Vue = Vue;

import axios from 'axios';
import router from './routes/router';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

Vue.config.productionTip = false;

// set jwt
Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(VModal, { dialog: true });
Vue.use(VueAlert);

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = 'Bearer ' + token;
}

new Vue({
    el:'#app',
    router,
    store,    
    beforeCreate () {
        if (!store.getters.isLoggedIn) {
            router.push('/login');
        }
    }    
});
