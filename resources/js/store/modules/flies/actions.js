import axios from 'axios';
const routeApi = '/api/borts';
const routeApiTypes = '/api/bort-types';
const routeApiModels = '/api/bort-models';

export default{
    delete({commit}, id){
        axios
            .delete(`${routeApi}/${id}`, id)
            .then( () => {commit( 'DELETE', id);})
            .catch( err => {console.log(err);});
    },
    deleteTypes({commit}, id){
        axios
            .delete(`${routeApiTypes}/${id}`, id)
            .then( () => {commit( 'DELETE_TYPES', id);})
            .catch( err => {console.log(err);});
    },
    deleteModels({commit}, id){
        axios
            .delete(`${routeApiModels}/${id}`, id)
            .then( () => {commit( 'DELETE_MODELS', id);})
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
    addTypes({commit}, data){
        const localData = {...data};
        if(localData.id === null){
            axios
                .post(routeApiTypes, localData)
                .then( response => {commit( 'ADD_TYPES', response.data);})
                .catch( err => {console.log(err);});
        } else {
            console.log(localData);
            axios
                .put(`${routeApiTypes}/${localData.id}`,localData)
                .then( response => {commit( 'UPDATE_TYPES', response.data);})
                .catch( err => {console.log(err);});
        }
    },
    addModels({commit}, data){
        const localData = {...data};
        if(localData.id === null){
            axios
                .post(routeApiModels, localData)
                .then( response => {commit( 'ADD_MODELS', response.data);})
                .catch( err => {console.log(err);});
        } else {
            console.log(localData);
            axios
                .put(`${routeApiModels}/${localData.id}`,localData)
                .then( response => {commit( 'UPDATE_MODELS', response.data);})
                .catch( err => {console.log(err);});
        }
    },
    load({commit}){
        axios.get(routeApi).then( response => commit('LOADED', response.data ));        
    },
    loadTypes({commit}){
        axios.get(routeApiTypes).then( response => commit('LOADED_TYPES', response.data ));        
    },
    loadModels({commit}){
        axios.get(routeApiModels).then( response => commit('LOADED_MODELS', response.data ));        
    },
}