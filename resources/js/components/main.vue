<template>  
    <div id="app">
        <top-menu></top-menu>
        <div class="container">
            <router-view/>

            <vue-alert></vue-alert>
        </div>
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

        this.$alert.success({ message: 'test'});
        this.$alert.danger({ message: 'dangerTest'});
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      },
      showNotifications(){
        const localNotifications = [...this.notifications];
        localNotifications.map( notify => {
          const alertObject = {
            message: notify.message,
          }
          if (notify.type == 'success') this.$alert.success(alertObject);
          else if(notify.type == 'danger') this.$alert.danger(alertObject);
        });
        this.$store.commit('REMOVE_NOTIFICATIONS');
      }
    },

    created() {
      //check for token freshness
      this.$http.interceptors.response.use(undefined, function (err) {
          console.log(err);
          return new Promise(function (resolve, reject) {
              if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
              this.$store.dispatch("logout")
          }
          throw err;
          });
      });

      //load targets
      this.$store.dispatch('targets/load');
      this.$store.dispatch('types/load');
      this.$store.dispatch('departaments/load');
      this.$store.dispatch('borts/load');
      this.$store.dispatch('flies/load');
      this.$store.dispatch('pilots/load');
      this.$store.dispatch('administrative/load');
    },

    watch:{
      notifications: function(ov, nv){
        if(nv.length > ov.length)
          this.showNotifications();
      }
    },
    computed:{
      notifications(){
        return this.$store.getters.flash;
      }
    }
}
</script>

<style>
  .pointer{
    cursor:pointer;
  }
</style>