import axios from 'axios';
const routeApi = '/api/administrative';

export default{
    load({commit}){
        axios
            .get(`${routeApi}/raions`)
            .then( response => commit('LOADED', response.data ))
            .catch( err => console.log("asdasda", err));
    },
    loadNp({commit},raion){
        return axios
            .get(`${routeApi}/np/${raion}`)
            .then( response => commit('LOADEDNP', response.data ));
        
    }
}