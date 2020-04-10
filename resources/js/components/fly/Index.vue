<template>
    <div class="card container mt-3">
        <div class="mt-3 mb-3">
            <h3>Полеты</h3>
            <span class="dropdown-toggle pointer" @click="showFilterPanel = !showFilterPanel">Фильтр</span>
            <form v-if="showFilterPanel">
                <div class="row">
                    <div class="form-group col-4">
                        <label for="pilot">Пилот</label>
                        <select class="custom-select" v-model="filter.pilot" name="pilot" id="pilot">
                            <option selected value="">Очистить фильтр</option>
                            <option v-for="item in pilots" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="form-group col-4">
                        <label for="target">Цель полета</label>                            
                        <select class="custom-select" v-model="filter.target" name="target">
                            <option selected value="">Очистить фильтр</option>
                            <option v-for="item in targets" :key="item.id" :value="item.id">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="form-group col-4">
                        <label for="fly_date">Дата</label>
                        <date-picker
                            id="fly_date"
                            name="fly_date"
                            :lang="lang"
                            v-model="filter.date"
                            valueType="date"
                            type="date"
                            format="DD.MM.YYYY"
                            :range="true"
                        ></date-picker>

                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="container">
                        <h5>
                            Всего полетов: <span class="badge badge-warning ml-2">{{ items.length }}</span>
                        </h5>
                    </div>
                </div>
            </form>
        </div>
        
        <table class="table table-hover text-center">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Дата</th>
                <th scope="col">Объект</th>
                <th scope="col">Цель</th>
                <th scope="col">Борт</th>
                <th scope="col">Пилот</th>
                <th scope="col">Подразделение</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, idx) in items" :key="item.id">
                    <th scope="row">{{ idx + 1 }}</th>
                    <td>{{ dateFormat(item.fly_date) }}</td>
                    <td>{{item.raion.name}}<span v-if="item.np"> - {{item.np.name}}</span><span v-if="item.raion_description"> - {{ item.raion_description }}</span></td>
                    <td>{{ item.target.name }}</td>
                    <td>{{ item.bort.bort_number }}</td>
                    <td>{{ item.pilot.name }}</td>
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
import moment from 'moment';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';

export default{
    data: () => ({
        id: null,
        showFilterPanel:false,
        lang: {
            formatLocale: {
                firstDayOfWeek: 1,
            },
        },
        filter:{
            pilot:  null,
            target: null,
            date:   null
        }
    }),
    components:{EditModal,DatePicker},
    methods:{
        dateFormat(date){
            return moment(date).format('DD.MM.YYYY');
        },
        closeHandler(){
            this.id = null;
            this.$modal.hide('FlyModal');
        },
        addHandler(){this.$modal.show('FlyModal')},
        editHandler(id){
            this.id = id;
            this.$modal.show('FlyModal');
        },
        deleteElement(item){
            const date = moment(item.fly_date);
            const answer = confirm(`Действительно удалить полет от ${date.format('DD.MM.YYYY')}`);
            if(answer){
                this.$store.dispatch('flies/delete', item.id);
            }            
        }
    },
    computed:{
        items(){
            let filtered = this.$store.getters['flies/all'];
            if(this.filter.pilot)
                filtered = filtered.filter( fly => fly.pilot_id == this.filter.pilot );
            if(this.filter.target)
                filtered = filtered.filter( fly => fly.target_id == this.filter.target );
            if(this.filter.date && this.filter.date[0] && this.filter.date[1])
                filtered = filtered.filter( fly => {
                    const fly_date = moment(fly.fly_date);
                    const start_date = moment(this.filter.date[0]);
                    const end_date = moment(this.filter.date[1]);
                    return fly_date >= start_date && fly_date <= end_date
                } );
            return filtered;
        },
        pilots(){ return this.$store.state.pilots.all; },
        targets(){ return this.$store.state.targets.all; },
    },

}
</script>

<style scoped>
    li:hover{
        background-color: lightgray;
    }
    .badge{
        font-size: 100%;
    }
</style>