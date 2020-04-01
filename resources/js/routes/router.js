import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import App from '../components/main';
import Login from '../components/auth/login';
import Secure from '../components/Secure';

Vue.use(VueRouter);

 let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/', 
            name: 'home',
            component: App
        },
        {
            path: '/login', 
            naem: 'Login',
            component: Login
        },
        {
            path: '/secure',
            name: 'secure',
            component: Secure,
            meta: { 
              requiresAuth: true
            }
          },
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next();
        return;
      }
      next('/login') 
    } else {
      next();
    }
});

export default router;