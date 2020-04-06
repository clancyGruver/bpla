<template>
    <div class="row">
        <div class="card mt-3">
            <div class="card-header">
                <h1>Типы полетов</h1>
            </div>
            <div class="card-body">                    
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
            this.$modal.hide('TypeModal');
        },
        addHandler(){this.$modal.show('TypeModal')},
        saveHandler(e){
            this.$store.dispatch('types/add', e);
            this.closeHandler();
        },
        editHandler(item){
            this.id = item.id;
            this.name = item.name;
            this.$modal.show('TypeModal');
        },
        deleteElement(item){
            const answer = confirm(`Действительно удалить ${item.name}`);
            if(answer){
                this.$store.dispatch('types/delete', item.id);
            }            
        }
    },
    computed:{
        items(){return this.$store.state.types.all},
    },

}
</script>

<style scoped>
    li:hover{
        background-color: lightgray;
    }

</style>