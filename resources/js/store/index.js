import Vue from 'vue';
import VueStore from 'vuex';
import axios from 'axios';

Vue.use(VueStore);

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default new VueStore.Store({
    state,
    actions,
    mutations,
    getters
});

