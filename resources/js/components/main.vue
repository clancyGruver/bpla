<template>  
    <div id="app">
        <top-menu></top-menu>
        <router-view/>
    </div>
</template>

<script>
import topMenu from './TopMenu';

export default {
    name:'mainTemplate',
    data: () => ({
    }),    
    components: {topMenu},
    mounted(){
        const appEl = document.getElementById('app');
        const classElements = [
            'd-flex',
            'justify-content-center',
            'h-100'
        ];
        classElements.map( el => appEl.classList.remove(el) );
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
    created: function () {
        this.$http.interceptors.response.use(undefined, function (err) {
            return new Promise(function (resolve, reject) {
                if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                this.$store.dispatch("logout")
            }
            throw err;
            });
        });
    }
}
</script>