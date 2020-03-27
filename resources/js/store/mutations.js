export default {    
    LOGIN_USER (state) {
        state.isLogged = true
    },
    
    LOGOUT_USER (state) {
        state.isLogged = false
    }
}