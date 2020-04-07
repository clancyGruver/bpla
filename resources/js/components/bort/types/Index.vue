<template>
    <div class="row">
        <div class="container mt-3">
            <h3>Тип БВС</h3>
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
            this.$modal.hide('BortTypeModal');
        },
        addHandler(){this.$modal.show('BortTypeModal')},
        saveHandler(e){
            this.$store.dispatch('borts/addTypes', e);
            this.closeHandler();
        },
        editHandler(item){
            this.id = item.id;
            this.name = item.name;
            this.$modal.show('BortTypeModal');
        },
        deleteElement(item){
            const answer = confirm(`Действительно удалить ${item.name}`);
            if(answer){
                this.$store.dispatch('borts/deleteTypes', item.id);
            }            
        }
    },
    computed:{
        items(){return this.$store.state.borts.types},
    },

}
</script>

<style scoped>
    li:hover{
        background-color: lightgray;
    }

</style>