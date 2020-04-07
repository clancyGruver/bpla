<template>
    <div class="row mt-3 ">
        <div class="col-3">
            <nav id="sidebar">
                  <ul class="list-unstyled components">
                    <router-link to="/borts/" class="nav-link">БВС</router-link>
                    <router-link to="/borts/types" class="nav-link">Типы БВС</router-link>
                    <router-link to="/borts/models" class="nav-link">Модели БВС</router-link>
                  </ul>
            </nav>
        </div>
        <div class="card col-9">            
            <router-view/>
        </div>
    </div>
</template>

<script>
export default{
    created(){

        this.$store.dispatch('borts/loadTypes');
        this.$store.dispatch('borts/loadModels');
    }
}
</script>

<style scoped>
    li:hover{
        background-color: lightgray;
    }
    #sidebar{
        background-color: white;
        border-radius: 5px;
        height: 100%;
        width: 100%;
    }
    #sidebar a{
        color: black;
    }

</style>