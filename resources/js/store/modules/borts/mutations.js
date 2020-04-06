export default{    
    LOADED(state, data){
        state.all = data;
    },
    LOADED_TYPES(state, data){
        state.types = data;
    },
    LOADED_MODELS(state, data){
        state.models = data;
    },

    UPDATE(state, data){
        const el = state.all.find( target => target.id == data.id);
        el.name = data.name;
    },
    UPDATE_TYPES(state, data){
        const el = state.types.find( target => target.id == data.id);
        el.name = data.name;
    },
    UPDATE_MODELS(state, data){
        const el = state.models.find( target => target.id == data.id);
        el.name = data.name;
    },

    ADD(state, data){
        state.all.push(data);
    },
    ADD_TYPES(state, data){
        state.types.push(data);
    },
    ADD_MODELS(state, data){
        state.models.push(data);
    },

    DELETE(state, id){
        const elIndex = state.all.findIndex( target => target.id == id);
        state.all.splice(elIndex, 1);
    },
    DELETE_TYPES(state, id){
        const elIndex = state.types.findIndex( target => target.id == id);
        state.types.splice(elIndex, 1);
    },
    DELETE_MODELS(state, id){
        const elIndex = state.models.findIndex( target => target.id == id);
        state.models.splice(elIndex, 1);
    },
}