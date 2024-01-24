// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: [],
    products: [] // 商品数据
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const found = state.cartItems.find(item => item.id === product.id);
      if (found) {
        found.quantity++;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    INCREASE_QUANTITY(state, item) {
      const cartItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      }
    },
    DECREASE_QUANTITY(state, item) {
      const cartItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
      }
    },
    REMOVE_FROM_CART(state, item) {
      state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== item.id);
    },
  },
  getters: {
    cartTotalPrice: (state) => {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  actions: {
    loadProducts({ commit }) {
      // 模拟异步获取数据 或者api调取
      const products = [
        { id: 1, name: '裤子 1', color: 'Green', price: 10, imageUrl: 'pants.jpg' },
        { id: 2, name: '衬衫 2', color: 'Red', price: 15 },
        { id: 3, name: '毛巾 3', color: 'Blue', price: 20 },
        { id: 4, name: '羽绒服 4', color: 'Green', price: 120 },
        { id: 5, name: '保温杯 5', color: 'Red', price: 8 },
        // 添加更多商品
      ];

      // 在模板中使用require导入图片
      commit('SET_PRODUCTS', products);
    },
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
    // ...其他 actions...
  },
});
