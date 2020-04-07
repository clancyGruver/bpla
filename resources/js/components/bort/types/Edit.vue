<template>

  <modal name="BortTypeModal" transition="fadeIn" @closed="cancelHandler" @opened="openedHandler">
        <div class="card">
            <div class="card-header">
                <h1>{{cardName}}</h1>
            </div>
            <div class="card-body">
                <form>                    
                    <div class="form-group">
                        <label for="name">Наименование</label>
                        <input v-model="localName" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Введите наименование">
                        <small id="nameHelp" class="form-text text-muted">Наименование типа полета</small>
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
    props:['initialName','id'],
    data() {
        return{
            localName: '',
        }
    },
    computed:{
        cardName() {return this.initialName.trim() == '' ? 'Новый' : 'Корректировка'},
        returnObject() {return {
            name: this.localName,
            id: this.id
        }},
    },
    methods:{
        openedHandler(){
            this.localName = this.initialName;
        },
        saveHandler(){
            this.$emit('closeModal',this.returnObject);
        },
        cancelHandler(){this.$emit('closeModalWithoutSave',this.name);},
    }

}
</script>