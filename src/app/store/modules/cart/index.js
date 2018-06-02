import axios from 'axios';

const state = {
    cartItems: []
};

const mutations = {
    UPDATE_CART_ITEMS (state, payload) {
        state.cartItems = payload;
    }
};

// create actions to collect, add, delete one, or delete all items
const actions = {
    getCartItems ({ commit }) {
        axios.get('/api/cart').then((response) => {
            commit('UPDATE_CART_ITEMS', response.data)
        });
    },
    addCartItem ({ commit }, cartItem) {
        axios.post('/api/cart', cartItem).then((response) => {
            commit('UPDATE_CART_ITEMS', response.data)
        });
    },
    deleteCartItem ({ commit }, cartItem) {
        axios.post('/api/cart/delete', cartItem).then((response) => {
            commit('UPDATE_CART_ITEMS', response.data)
        });
    },
    removeAllCartItems ({ commit }) {
        axios.post('/api/cart/delete/all').then((response) => {
            commit('UPDATE_CART_ITEMS', response.data)
        });
    }
};

// get cartItems from Vuex
const getters = {
    cartItems: state => state.cartItems,
    // create getter for retunring the cart total from products in cart
    cartTotal: state => {
        return state.cartItems.reduce((acc, cartItem) => {
            return (cartItem.quantity * cartItem.price) + acc;

        }, 0).toFixed(2);
    },
    // return total quantity of items in my cart
    cartQuantity: state => {
        return state.cartItems.reduce((acc, cartItem) => {
            return cartItem.quantity + acc;
        }, 0);
    }
};

const cartModule = {
    state,
    mutations,
    actions,
    getters
}

export default cartModule;