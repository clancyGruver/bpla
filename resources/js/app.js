import Vue from 'vue';
window.Vue = Vue;
window.axios = require('axios');
import router from './routes/router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import mainTemplate from './components/main'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('mainTemplate', mainTemplate);

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
