export default{    
    LOADED(state, data){
        state.all = data;
    },

    UPDATE(state, data){
        state.all = [
            ...state.all.filter( el => el.id !== data.id),
            data
        ];
    },

    ADD(state, data){
        state.all.push(data);
    },

    DELETE(state, id){
        const elIndex = state.all.findIndex( target => target.id == id);
        state.all.splice(elIndex, 1);
    },
}