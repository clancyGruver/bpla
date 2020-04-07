import VueRouter from 'vue-router';
import store from '../store';
import App from '../components/main';
import Login from '../components/auth/login';
import Target from '../components/target';
import Type from '../components/type';
import Departament from '../components/departament';
import BortMain from '../components/bort';
import Bort from '../components/bort/main';
import BortType from '../components/bort/types';
import BortModel from '../components/bort/models';
import Fly from '../components/fly';

 let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login', 
            name: 'Login',
            component: Login
        },
        {
            path: '/', 
            name: 'home',
            component: App,
            meta: { 
              requiresAuth: true
            },
            children:[
              {
                path: '/', 
                name: 'Flies',
                component: Fly
              },
              {
                path: 'targets', 
                name: 'Targets',
                component: Target
              },           
              {
                  path: 'types', 
                  name: 'Types',
                  component: Type
              }, 
              {
                  path: 'departaments', 
                  name: 'Departaments',
                  component: Departament
              },
              {
                  path: 'borts/',
                  component: BortMain,
                  children:[
                    {
                      path: '/', 
                      name: 'Borts',
                      component: Bort,
                    },
                    {
                      path: 'types', 
                      name: 'BortTypes',
                      component: BortType,
                    },
                    {
                      path: 'models', 
                      name: 'BortModels',
                      component: BortModel,
                    },
                  ]
              },
            ]
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