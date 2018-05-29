import Vue from 'vue';
import Vuex from 'vuex';
import product from './modules/product';
import cart from './modules/cart';

// applying Vuex
Vue.use(Vuex);

// allow for exporting store to any other part of the application
export default new Vuex.Store({
    modules: {
        product,
        cart
    }
})