<template>

  <modal name="BortModal" transition="fadeIn" @closed="cancelHandler" @opened="openedHandler">
        <div class="card">
            <div class="card-header">
                <h1>{{cardName}}</h1>
            </div>
            <div class="card-body">
                <div class="alert alert-danger" role="alert" v-if="alert.status">
                    <ul>
                        <li v-for="(item, idx) in alert.items" :key="idx">{{ item }}</li>
                    </ul>
                </div>
                <form class="form-inline">
                    <div class="form-group">
                        <input v-model="number" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Введите номер борта">
                    </div>
                    <div class="form-group">
                        <select class="custom-select" v-model="type" name="type">
                            <option disabled selected>Тип БВС</option>
                            <option v-for="type in types" :key="type.id" :value="type.id">{{ type.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="custom-select" v-model="model" name="model">
                            <option disabled selected>Модель БВС</option>
                            <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select class="custom-select" v-model="departament"  name="departament">
                            <option disabled selected>Подразделение</option>
                            <option v-for="departament in departaments" :key="departament.id" :value="departament.id">{{ departament.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input v-model="status" type="text" class="form-control" id="name" aria-describedby="stausHelp" placeholder="Введите статус">
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
        'initialNumber', 
        'initialType', 
        'initialModel', 
        'initialDepartament', 
        'initialStatus', 
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
        cardName() {return this.initialNumber.trim() == '' ? 'Новый борт' : 'Корректировка борта'},
        returnObject() {return {
            number: this.number,
            type: this.type,
            model: this.model,
            departament: this.departament,
            status: this.status,
            id: this.id
        }},
    },
    methods:{
        openedHandler(){
            this.number = this.initialNumber;
            this.type = this.initialType;
            this.model = this.initialModel;
            this.departament = this.initialDepartament;
            this.status = this.status;
        },
        check(){
            if(!this.number.trim())
                alert.items.push('Не введен номер борта');
            if(!this.type)
                alert.items.push('Не выбран тип БВС');
            if(!this.model)
                alert.items.push('Не выбрана модель БВС');
            if(!this.departament)
                alert.items.push('Не выбрано подразделение');
            if(alert.items.length > 0)
                alert.status = false;
            else
                alert.status = true;
            return alert.status;
        },
        saveHandler(){
            if(this.check())
                this.$emit('closeModal',this.returnObject);
        },
        cancelHandler(){this.$emit('closeModalWithoutSave');},
    }

}
</script>