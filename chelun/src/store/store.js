import Vue from 'vue';
import Vuex from 'vuex';
import indexStore from './indexStore/indexStore';
import indexStoreTwo from './indexStore/indexStore_two';
import upDateImgStore from './indexStore/upDateImgStore';
import getCityListStore from './indexStore/getCityListStore';
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        upDateImgStore,
        getCityListStore,
        indexStore,
        indexStoreTwo
    }
})