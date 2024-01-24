<template>
  <div>
    <!-- 购物车其他内容 -->
    <CartItem
      v-for="item in cartItems"
      :key="item.id"
      :item="item"
    />
    <!-- 显示购物车总价 -->
    <div class="cart-total">总价：${{ cartTotalPrice }}</div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  components: {
    CartItem
  },
  computed: {
    cartItems() {
      // 从 Vuex 获取购物车商品
      return this.$store.state.cartItems;
    },
    cartTotalPrice() {
      // 从 Vuex 获取购物车总价
      return this.$store.getters.cartTotalPrice;
    }
  }
}
</script>

<style>
.cart-total {
  /* 添加应用程序的样式 */
  font-size: 1.5em;
  margin-top: 20px;
  /* 其他样式 */
}
</style>
