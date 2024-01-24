<template>
  <div class="cart-item">
    <!-- 商品信息 -->
    <div class="cart-item-info">
      <p>{{ item.name }}</p>
      <p>Price: ${{ item.price.toFixed(2) }}</p>
    </div>

    <!-- 商品数量调整 -->
    <div class="cart-item-quantity">
      <button @click="decreaseQuantity" class="quantity-button">-</button>
      <span>{{ item.quantity }}</span>
      <button @click="increaseQuantity" class="quantity-button">+</button>
    </div>

    <!-- 移除商品按钮 -->
    <button @click="removeFromCart" class="remove-button">Remove</button>

    <!-- 商品总价 -->
    <div class="cart-item-total">
      <p>Total Price: ${{ (item.price * item.quantity).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: Object
  },
  methods: {
    increaseQuantity() {
      this.$store.commit('INCREASE_QUANTITY', this.item);
    },
    decreaseQuantity() {
      this.$store.commit('DECREASE_QUANTITY', this.item);
    },
    removeFromCart() {
      this.$store.commit('REMOVE_FROM_CART', this.item);
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}

.cart-item-info,
.cart-item-quantity,
.cart-item-total {
  display: flex;
  align-items: center;
}

.quantity-button,
.remove-button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}

.cart-item-info p,
.cart-item-total p {
  margin: 0;
  padding: 0;
}

/* 根据需要添加更多样式 */
</style>
