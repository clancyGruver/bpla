export default {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    flash: state => state.flash,
}