export default{    
    TARGETS_LOADED(state, data){
        state.all = data;
    },
    TARGET_UPDATE(state, data){
        const el = state.all.find( target => target.id == data.id);
        el.name = data.name;
    },
    TARGET_ADD(state, data){
        state.all.push(data);
    },
    TARGET_DELETE(state, id){
        const elIndex = state.all.findIndex( target => target.id == id);
        state.all.splice(elIndex, 1);
    },
}