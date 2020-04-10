import Vue from 'vue';
import VueStore from 'vuex';
Vue.use(VueStore);

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import targets from './modules/targets';
import types from './modules/types';
import departaments from './modules/departaments';
import borts from './modules/borts';
import flies from './modules/flies';
import pilots from './modules/pilots';
import administrative from './modules/administrative';

export default new VueStore.Store({
    modules:{
        targets,
        types,
        departaments,
        borts,
        flies,
        pilots,
        administrative
    },
    state,
    actions,
    mutations,
    getters
});

