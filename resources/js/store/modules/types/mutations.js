export default{    
    LOADED(state, data){
        state.all = data;
    },
    UPDATE(state, data){
        const el = state.all.find( target => target.id == data.id);
        el.name = data.name;
    },
    ADD(state, data){
        state.all.push(data);
    },
    DELETE(state, id){
        const elIndex = state.all.findIndex( target => target.id == id);
        state.all.splice(elIndex, 1);
    },
}