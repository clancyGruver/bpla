<template>
    <div class="mt-3">
        <div class="card">
            <div class="card-header">
                <h1>БВС</h1>
            </div>
            <div class="card-body">                    
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Номер</th>
                        <th scope="col">Тип</th>
                        <th scope="col">Модель</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Подразделение</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, idx) in items" :key="item.id">
                            <th scope="row">{{ idx }}</th>
                            <td>{{ item.bort_number}}</td>
                            <td>{{ item.type.name }}</td>
                            <td>{{ item.model.name }}</td>
                            <td>{{ item.status }}</td>
                            <td>{{ item.departament.name }}</td>
                            <td>
                                <div class="btn-group" data-toggle="buttons">
                                    <button type="button" class="btn btn-outline-warning" @click="editHandler(item)"><i class="fas fa-edit"></i></button>
                                    <button type="button" class="btn btn-outline-danger" @click="deleteElement(item)"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" class="btn btn-outline-success" @click="addHandler">Добавить</button>
            </div>
        </div>
        <edit-modal
            @closeModal="saveHandler"
            @closeModalWithoutSave="closeHandler"
            :id="id"
            :initialNumber ="number"
            :initialType = "type"
            :initialModel = "model"
            :initialDepartament = "departament"
            :initialStatus = "status"
        ></edit-modal>
        <vue-alert></vue-alert>
    </div>
</template>
<script>
import EditModal from './Edit';

export default{
    data: () => ({
        id: null,
        number: '',
        type: '',
        model: '',
        departament: '',
        status: ''
    }),
    components:{EditModal},
    methods:{
        closeHandler(){
            this.id = null;
            this.name = '';
            this.$modal.hide('BortModal');
        },
        addHandler(){this.$modal.show('BortModal')},
        saveHandler(e){
            this.$store.dispatch('borts/add', e);
            this.closeHandler();
        },
        editHandler(item){
            this.id = item.id;
            this.number = item.bort_number;
            this.type = item.bort_type_id;
            this.model = item.bort_model_id;
            this.status = item.status;
            this.departament = item.departament_id;
            this.$modal.show('BortModal');
        },
        deleteElement(item){
            const answer = confirm(`Действительно удалить ${item.name}`);
            if(answer){
                this.$store.dispatch('borts/delete', item.id);
            }            
        }
    },
    computed:{
        items(){return this.$store.state.borts.all},
    },

}
</script>

<style scoped>
    li:hover{
        background-color: lightgray;
    }

</style>