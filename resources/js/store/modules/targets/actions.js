import axios from 'axios';
const routeApi = '/api/target';

export default{
    delete({commit}, id){
        axios
            .delete(`${routeApi}/${id}`, id)
            .then( () => {
                commit( 'TARGET_DELETE', id);
                commit( 'ADD_NOTIFICATION', {
                    type: 'success',
                    message: 'Цель полетов удалена'
                });
            })
            .catch( err => {
                console.log(err);
                commit( 'ADD_NOTIFICATION', {
                    type: 'danger',
                    message: 'Что-то пошло не так'
                });
            });
    },
    add({commit}, data){
        const localData = {...data};
        if(localData.id === null){
            axios
                .post(routeApi, localData)
                .then( response => {
                    commit( 'TARGET_ADD', response.data);
                    commit( 'ADD_NOTIFICATION', {
                        type: 'success',
                        message: 'Цель полетов добавлена'
                    });
                })
                .catch( err => {
                    console.log(err);
                    commit( 'ADD_NOTIFICATION', {
                        type: 'danger',
                        message: 'Что-то пошло не так'
                    });
                });
        } else {
            console.log(localData);
            axios
                .put(`${routeApi}/${localData.id}`,localData)
                .then( response => {
                    commit( 'TARGET_UPDATE', response.data);
                    commit( 'ADD_NOTIFICATION', {
                        type: 'success',
                        message: 'Цель полетов обновлена'
                    });
                })
                .catch( err => {
                    console.log(err);
                    commit( 'ADD_NOTIFICATION', {
                        type: 'danger',
                        message: 'Что-то пошло не так'
                    });
                });
        }
    },
    load({commit}){
        axios.get(routeApi).then( response => commit('TARGETS_LOADED', response.data ))
        .catch( error => {
            if (error.response.status == '401' && error.response.data == 'Unauthorized.') {
                console.log('pilot unauth')
                dispatch('logout', null, { root: true })
            }
        });        
    },
}