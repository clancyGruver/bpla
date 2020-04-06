import axios from 'axios';

export default {    
    login({commit}, user){
        return new Promise((resolve, reject) => {
            commit('auth_request');
            axios(
                {
                    url: 'http://localhost:8000/api/login', 
                    data: user, 
                    method: 'POST' 
                }, 
                { 
                    headers: { 
                        'content-type': 'application/x-www-form-urlencoded' 
                    } 
                })
            .then(resp => {
                const token = resp.data.token;
                const user = resp.data.user;
                localStorage.setItem('token', token);
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                commit('auth_success', token, user);
                resolve(resp);
            })
            .catch(err => {
                commit('auth_error');
                localStorage.removeItem('token');
                reject(err);
            })
        })
    },
    logout({commit}){
        return new Promise((resolve, reject) => {
            commit('logout');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common.Authorization;
            resolve();
        })
    }
}