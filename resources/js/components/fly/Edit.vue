<template>

    <modal
        name="FlyModal"
        transition="fadeIn"
        @closed="cancelHandler"
        @opened="openedHandler"
        :adaptive="true"
        :resizable="true"
        :scrollable="true"
        height="auto"
        width="90%"
    >
        <div class="card">
            <div class="card-header">
                <h3>{{cardName}}</h3>
            </div>
            <div class="card-body">
                <div class="alert alert-danger" role="alert" v-if="alert.status">
                    <ul>
                        <li v-for="(item, idx) in alert.items" :key="idx">{{ item }}</li>
                    </ul>
                </div>
                <form class="form">
                    <div class="row">
                        <div class="form-group col-4">
                            <label for="fly_date">Дата</label>
                            <date-picker id="fly_date" name="fly_date" :lang="lang" v-model="fly_date" valueType="date" type="date" format="DD.MM.YYYY"></date-picker>
                        </div>
                        <div class="form-group col-4">
                            <label for="time_range">Время полета</label>
                            <date-picker id="time_range" name="time_range" lang="ru-ru" v-model="time_range" valueType="date" type="time" :range="true" :showSecond="false"></date-picker>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-group col-4">
                            <label for="bort">БВС</label>
                            <select class="custom-select" v-model="bort_id" name="bort" id="bort">
                                <option v-for="item in borts" :key="item.id" :value="item.id">{{ item.bort_number }} {{ item.model.name }}</option>
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="pilot">Пилот</label>
                            <select class="custom-select" v-model="pilot_id" name="pilot" id="pilot">
                                <option disabled selected>Пилот</option>
                                <option v-for="item in pilots" :key="item.id" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="departament">Подразделение</label>
                            <select class="custom-select" v-model="departament_id" name="departament" id="departament">
                                <option v-for="item in departaments" :key="item.id" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-group col-4">
                            <label for="wind_speed">Скорость ветра, м/с</label>
                            <input id="wind_speed" name="wind_speed" class="form-control" type="number" max="20" min="0" v-model="wind_speed">
                        </div>
                        <div class="form-group col-4">
                            <label for="temperature">Температура</label>
                            <input id="temperature" name="temperature"  class="form-control" type="number" max="50" min="-20" v-model="temperature">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-group col-4">
                            <label for="target">Район</label>                            
                            <select class="custom-select" v-model="raion_okato" name="raion" @change="loadNp">
                                <option v-for="item in raions" :key="item.code" :value="item.code">{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="target">Населенный пункт</label>             
                            <div v-if="raion_okato">
                                <div v-if="npLoading">
                                    <i class="fas fa-spinner fa-pulse"></i>Загружаются населенные пункты
                                </div>
                                <select class="custom-select" v-model="np_okato" name="target" v-else>
                                    <option v-for="item in nps" :key="item.code" :value="item.code">{{ item.name }}</option>
                                </select>
                            </div>
                            <div v-else>
                                <span>Не выбран район</span>
                            </div>
                        </div>
                        <div class="form-group col-4">
                            <label for="raion_description">Пояснение к месту</label>            
                            <textarea
                                name="raion_description"
                                id="raion_description"
                                rows="2"
                                class="form-control"
                                v-model="raion_description"
                            ></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="form-group col-3">
                            <label for="target">Цель полета</label>                            
                            <select class="custom-select" v-model="target_id" name="target">
                                <option v-for="item in targets" :key="item.id" :value="item.id">{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="form-group col-3">
                            <label for="mode">Номер режима</label>            
                            <input name="mode" id="mode" class="form-control" v-model="mode" />
                        </div>
                        <div class="form-group col-3">
                            <label for="fly_square">Площадь облета, м<sup>2</sup></label>            
                            <input name="fly_square" id="fly_square" class="form-control" v-model.number="fly_square" type="number" step="0.1" min="0.1"/>
                        </div>
                        
                        <div class="form-group col-3">
                            <label for="raion_description">Достигнутые цели</label>            
                            <textarea
                                name="raion_description"
                                id="raion_description"
                                rows="2"
                                class="form-control"
                                v-model="result"
                            ></textarea>
                        </div>
                    </div>
                </form>
                
                <div class="btn-group" data-toggle="buttons">
                    <button type="button" class="btn btn-outline-success" @click="saveHandler">Сохранить</button>
                    <button type="button" class="btn btn-outline-danger" @click="cancelHandler">Отмена</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ru';
import moment from 'moment';

export default{
    components: { DatePicker },
    props:[
        'id'
    ],
    data() {
        return{
            lang: {
                formatLocale: {
                    firstDayOfWeek: 1,
                },
            },
            bort_id: null,
            pilot_id: null,
            departament_id: null,
            target_id: null,
            fly_date: null,
            time_range: null,
            wind_speed: 0,
            temperature: 0,
            raion_description: '',
            mode: '',
            fly_square: '',
            result: '',

            raion_okato: null,
            np_okato: null,
            npLoading: false,

            alert:{
                status: false,
                items:[]
            }
        }
    },
    computed:{
        cardName() {return this.id ? 'Корректировка полета' : 'Новый полет'},
        borts(){ return this.$store.state.borts.all; },
        departaments(){ return this.$store.state.departaments.all; },
        pilots(){ return this.$store.state.pilots.all; },
        targets(){ return this.$store.state.targets.all; },
        fly() { 
            if(this.id)
                return this.$store.getters['flies/one'](this.id);
            else
                return null;
        },
        returnObject() {            
            const end_time = moment(this.time_range[1]);
            const start_time = moment(this.time_range[0]);
            const diff = end_time.diff(start_time,'minute');
            const date = moment(this.fly_date);

            return {
                id: this.id,
                departament_id: this.departament_id,
                bort_id: this.bort_id,
                target_id: this.target_id,
                pilot_id: this.pilot_id,
                raion_okato: this.raion_okato,
                np_okato: this.np_okato,
                raion_description: this.raion_description,
                fly_date: date.format('YYYY-MM-DD'),
                time_start: start_time.format("YYYY-MM-DD HH:mm:ss"),
                time_end: end_time.format("YYYY-MM-DD HH:mm:ss"),
                wind_speed: this.wind_speed,
                temperature: this.temperature,
                fly_square: this.fly_square,
                time_fly: diff,
                mode: this.mode,
                result: this.result,
        }},
        raions() {return this.$store.getters['administrative/states']},
        nps() {return this.$store.getters['administrative/np']},
    },
    methods:{
        loadNp(){
            this.np_okato = null;
            this.npLoading = true;
            this.$store.dispatch('administrative/loadNp',this.raion_okato).then( () => this.npLoading = false);
        },
        openedHandler(){
            if(!this.fly){
                return;
            }
            if(this.fly.raion_okato){
                this.raion_okato = this.fly.raion_okato;
                this.loadNp();
            }
            this.departament_id = this.fly.departament_id;
            this.bort_id = this.fly.bort_id;
            this.target_id = this.fly.target_id;
            this.pilot_id = this.fly.pilot_id;
            this.fly_date = new Date(this.fly.fly_date);
            this.time_range = [
                new Date(this.fly.time_start),
                new Date(this.fly.time_end)
                ];
            this.wind_speed = this.fly.wind_speed || 0;
            this.temperature = this.fly.temperature || 0;;
            this.fly_square = this.fly.fly_square;
            this.time_fly = '';
            this.mode = this.fly.mode;
            this.result = this.fly.result;
            this.np_okato = this.fly.np_okato;
            this.raion_description = this.fly.raion_description;
        },
        check(){
            this.alert.items = [];
            if(!this.fly_date)
                this.alert.items.push('Не выбрана дата');
            if(!this.time_range[0])
                this.alert.items.push('Не выбрано время начала полета');
            if(!this.time_range[1])
                this.alert.items.push('Не выбрано время окончания полета');
            if(!this.bort_id)
                this.alert.items.push('Не выбран борт');
            if(!this.pilot_id)
                this.alert.items.push('Не выбран внешний пилот');
            if(!this.departament_id)
                this.alert.items.push('Не выбрано подразделение');
            if(!this.target_id)
                this.alert.items.push('Нет цели полета');
            if(!this.wind_speed)
                this.alert.items.push('Нет введена скорость ветра');
            if(!this.temperature)
                this.alert.items.push('Не введена температура');
            if(!this.fly_square)
                this.alert.items.push('Не введена площадь облета');
            if(!this.fly_square)
                this.alert.items.push('Не введена площадь облета');
            if(!this.raion_okato)
                this.alert.items.push('Не введен район полета');

            if(this.alert.items.length > 0)
                this.alert.status = true;
            else
                this.alert.status = false;
            return !this.alert.status;
        },
        saveHandler(){
            console.log(this.returnObject);
            if(this.check()){
                this.alert.status = false;
                this.$store.dispatch('flies/add', this.returnObject);
                this.cancelHandler();
            }
        },
        cancelHandler(){            
            this.bort_id = null;
            this.pilot_id = null;
            this.departament_id = null;
            this.target_id = null;
            this.fly_date = null;
            this.time_range = null;
            this.wind_speed = 0;
            this.temperature = 0;
            this.raion_description = 0;
            this.mode = '';
            this.fly_square = '';
            this.result = '';
            this.raion_okato = null;
            this.np_okato = null;
            this.npLoading = false;
            this.$emit('closeModal');
        },
    }

}
</script>