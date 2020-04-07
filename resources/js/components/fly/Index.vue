<template>
    <div class="card container mt-3">
        <h3>Полеты</h3>
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
                    <th scope="row">{{ idx + 1 }}</th>
                    <td>{{ item.bort_number}}</td>
                    <td>{{ item.type.name }}</td>
                    <td>{{ item.model.name }}</td>
                    <td>{{ item.status }}</td>
                    <td>{{ item.departament.name }}</td>
                    <td>
                        <div class="btn-group" data-toggle="buttons">
                            <button type="button" class="btn btn-outline-warning" @click="editHandler(item.id)"><i class="fas fa-edit"></i></button>
                            <button type="button" class="btn btn-outline-danger" @click="deleteElement(item)"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <button type="button" class="btn btn-outline-success" @click="addHandler">Добавить</button>
        <edit-modal
            @closeModal="closeHandler"
            :id="id"
        ></edit-modal>
        <vue-alert></vue-alert>
    </div>
</template>
<script>
import EditModal from './Edit';

export default{
    data: () => ({
        id: null,
    }),
    components:{EditModal},
    methods:{
        closeHandler(){
            this.id = null;
            this.$modal.hide('BortModal');
        },
        addHandler(){this.$modal.show('BortModal')},
        editHandler(id){
            this.id = id;
            console.log(id);
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
        items(){return this.$store.getters['borts/all']},
    },

}
</script>

<style scoped>
    li:hover{
        background-color: lightgray;
    }

</style>