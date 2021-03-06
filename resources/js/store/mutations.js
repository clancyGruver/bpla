import router from '../routes/router';

export default {    
    auth_request(state){
        state.status = 'loading';
    },
    auth_success(state, token, user){
        state.status = 'success';
        state.token = token;
        state.user = user;
    },
    auth_error(state){
        state.status = 'error';
    },
    logout(state){
        state.status = '';
        state.token = '';
        router.push('/login');
    },
    ADD_NOTIFICATION(state, data){
        state.flash.push(data);
    },
    REMOVE_NOTIFICATIONS(state){
        state.flash = [];
    },
}