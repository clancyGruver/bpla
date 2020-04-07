<template>

    <modal
        name="BortModal"
        transition="fadeIn"
        @closed="cancelHandler"
        @opened="openedHandler"
        :adaptive="true"
        :resizable="true"
        :height="'450'"
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
                    <div class="form-group row">
                        <label for="number" class="col-sm-3 col-form-label">Номер</label>
                        <div class="col-sm-9">
                            <input v-model="number" type="text" class="form-control" id="number" aria-describedby="nameHelp" placeholder="Введите номер борта">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="type" class="col-sm-3 col-form-label">Тип</label>
                        <div class="col-sm-9">
                            <select class="custom-select" v-model="type" name="type">
                                <option disabled selected>Тип БВС</option>
                                <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="model" class="col-sm-3 col-form-label">Модель</label>
                        <div class="col-sm-9">
                            <select class="custom-select" v-model="model" name="model">
                                <option disabled selected>Модель БВС</option>
                                <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="departament" class="col-sm-3 col-form-label">Подразделение</label>
                        <div class="col-sm-9">
                            <select class="custom-select" v-model="departament"  name="departament">
                                <option disabled selected>Подразделение</option>
                                <option v-for="departament in departaments" :key="departament.id" :value="departament.id">{{ departament.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="status" class="col-sm-3 col-form-label">Статус</label>
                        <div class="col-sm-9">
                            <input v-model="status" type="text" class="form-control" id="status" aria-describedby="stausHelp" placeholder="Введите статус">
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
export default{
    props:[
        'id'
    ],
    data() {
        return{
            number: '',
            type: '',
            model: '',
            departament: '',
            status: '',
            alert:{
                status: false,
                items:[]
            }
        }
    },
    computed:{
        types(){ return this.$store.state.borts.types;},
        models(){ return this.$store.state.borts.models;},
        departaments(){ return this.$store.state.departaments.all;},
        cardName() {return this.id ? 'Корректировка борта' : 'Новый борт'},
        bort() { 
            const id = this.id;
            const el = this.$store.state.borts.all.find( el => el.id == id);
            return el ;
        },
        returnObject() {return {
            bort_number: this.number,
            bort_type_id: this.type,
            bort_model_id: this.model,
            departament_id: this.departament,
            status: this.status,
            id: this.id
        }},
    },
    methods:{
        openedHandler(){
            this.number = this.bort.bort_number;
            this.type = this.bort.bort_type_id;
            this.model = this.bort.bort_model_id;
            this.departament = this.bort.departament_id;
            this.status = this.bort.status;
        },
        check(){
            this.alert.items = [];
            if(!this.number.trim())
                this.alert.items.push('Не введен номер борта');
            if(!this.type)
                this.alert.items.push('Не выбран тип БВС');
            if(!this.model)
                this.alert.items.push('Не выбрана модель БВС');
            if(!this.departament)
                this.alert.items.push('Не выбрано подразделение');
            if(this.alert.items.length > 0)
                this.alert.status = true;
            else
                this.alert.status = false;
            return !this.alert.status;
        },
        saveHandler(){
            if(this.check()){
                this.alert.status = false;
                this.$store.dispatch('borts/add', this.returnObject);
                this.cancelHandler();
            }
        },
        cancelHandler(){this.$emit('closeModal');},
    }

}
</script>