import axios from 'axios';
const routeApi = '/api/fly';

export default{
    delete({commit}, id){
        axios
            .delete(`${routeApi}/${id}`, id)
            .then( () => {commit( 'DELETE', id);})
            .catch( err => {console.log(err);});
    },

    add({commit}, data){
        const localData = {...data};
        if(localData.id === null){
            axios
                .post(routeApi, localData)
                .then( response => {commit( 'ADD', response.data);})
                .catch( err => {console.log(err);});
        } else {
            axios
                .put(`${routeApi}/${localData.id}`,localData)
                .then( response => {commit( 'UPDATE', response.data);})
                .catch( err => {console.log(err);});
        }
    },
    load({commit}){
        axios.get(routeApi).then( response => commit('LOADED', response.data ))
        .catch( error => {
            if (error.response.status == '401' && error.response.data == 'Unauthorized.') {
                console.log('flies unauth')
                dispatch('logout', null, { root: true })
            }
        });
    },
}