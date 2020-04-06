<template>
    <div class="row">
        <div class="card mt-3">
            <div class="card-header">
                <h1>Цели полетов</h1>
            </div>
            <div class="card-body">                    
                <ul class="list-unstyled card-text">        
                    <li
                        class="pointer"
                        v-for="target in targets"
                        :key="target.id"
                    >
                        {{ target.name }}
                        <div class="btn-group" data-toggle="buttons">
                            <button type="button" class="btn btn-outline-warning" @click="editHandler(target)"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-outline-danger" @click="deleteElement(target)"><i class="fas fa-trash-alt"></i></button>
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
            this.$modal.hide('TargetModal');
        },
        addHandler(){this.$modal.show('TargetModal')},
        saveHandler(e){
            this.$store.dispatch('targets/add', e);
            this.closeHandler();
        },
        editHandler(target){
            this.id = target.id;
            this.name = target.name;
            this.$modal.show('TargetModal');
        },
        deleteElement(target){
            const answer = confirm(`Действительно удалить ${target.name}`);
            if(answer){
                this.$store.dispatch('targets/delete', target.id);
            }            
        }
    },
    computed:{
        targets(){return this.$store.state.targets.all},
    },

}
</script>

<style scoped>
    li:hover{
        background-color: lightgray;
    }

</style>