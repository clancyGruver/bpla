<template>
    <div class="row">
        <div class="container mt-3">
            <h3>Модели БВС</h3>
            <ul class="list-unstyled card-text">        
                <li
                    class="pointer"
                    v-for="item in items"
                    :key="item.id"
                >
                    {{ item.name }}
                    <div class="btn-group" data-toggle="buttons">
                        <button type="button" class="btn btn-outline-warning" @click="editHandler(item)"><i class="fas fa-edit"></i></button>
                        <button type="button" class="btn btn-outline-danger" @click="deleteElement(item)"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </li>
            </ul>
            <button type="button" class="btn btn-outline-success" @click="addHandler">Добавить</button>
        </div>
        <edit-modal
            @closeModal="saveHandler"
            @closeModalWithoutSave="closeHandler"
            :id="id"
            :initialName="name"
        ></edit-modal>
        <vue-alert></vue-alert>
    </div>
</template>
<script>
import EditModal from './Edit';

export default{
    data: () => ({
        id: null,
        name: '',
    }),
    components:{EditModal},
    methods:{
        closeHandler(){
            this.id = null;
            this.name = '';
            this.$modal.hide('BortModelModal');
        },
        addHandler(){this.$modal.show('BortModelModal')},
        saveHandler(e){
            this.$store.dispatch('borts/addModels', e);
            this.closeHandler();
        },
        editHandler(item){
            this.id = item.id;
            this.name = item.name;
            this.$modal.show('BortModelModal');
        },
        deleteElement(item){
            const answer = confirm(`Действительно удалить ${item.name}`);
            if(answer){
                this.$store.dispatch('borts/deleteModels', item.id);
            }            
        }
    },
    computed:{
        items(){return this.$store.state.borts.models},
    },

}
</script>

<style scoped>
    li:hover{
        background-color: lightgray;
    }

</style>