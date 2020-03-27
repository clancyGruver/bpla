import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const mainTemplate = require('../components/main');
const Login = require('../components/auth/login');

export default new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        {path: '/', component: mainTemplate},
        {path: '/login', component: Login},
    ]
});