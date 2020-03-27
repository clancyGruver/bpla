import Vue from 'vue';
import VueStore from 'vuex';

Vue.use(VueStore);

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import state from './state';

export default new VueStore.Store({
    state,
    actions,
    mutations,
    getters
});

