<template>
  <div class="container">
    <!-- 左侧筛选器固定，右侧产品列表滚动 -->
    <div class="sidebar">
      <div class="filters">
        <label v-for="color in availableColors" :key="color">
          <input type="checkbox" :value="color" v-model="selectedColors">
          {{ color }}
        </label>
      </div>
    </div>
    
    <div class="product-list">
      <div class="products">
        <div v-for="product in filteredProducts" :key="product.id" class="product-item">
          <img :src="getImageUrl(product.imageUrl)" :alt="product.name" class="product-image" />
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>Color: {{ product.color }}</p>
            <p>Price: ${{ product.price }}</p>
            <button @click="addToCart(product)">加入购物车</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProductList',
  data() {
    return {
      selectedColors: []
    };
  },
  computed: {
    ...mapState(['products']), // 从 Vuex 映射 products 到本地计算属性
    availableColors() {
      // 从产品列表中提取可用颜色
      const colors = this.products.map(product => product.color);
      return [...new Set(colors)]; // 返回去重后的颜色数组
    },
    filteredProducts() {
      // 如果没有选中任何颜色，返回所有产品
      if (this.selectedColors.length === 0) {
        return this.products;
      }
      // 否则，返回匹配选中颜色的产品
      return this.products.filter(product => 
        this.selectedColors.includes(product.color)
      );
    }
  },
  methods: {
    addToCart(product) {
      // 调用 Vuex action 添加产品到购物车
      this.$store.dispatch('addToCart', product);
    },
    getImageUrl(imageFileName) {
      // 获取图片URL，如果文件名不存在，使用默认图片
      try {
        return require(`@/assets/${imageFileName}`);
      } catch (e) {
        return require('@/assets/pants.jpg'); // 默认图片路径
      }
    }
  },
  created() {
    // 组件创建时，调用 action 加载产品数据
    this.$store.dispatch('loadProducts');
  }
}
</script>

<style scoped>
.container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
}

.sidebar {
  position: sticky;
  top: 0;
  flex: 0 0 240px;
  height: 100vh;
  overflow-y: auto;
  margin-right: 20px;
}

.product-list {
  flex: 1;
  overflow-y: auto;
  height: 100vh;
}

.products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 10px;
  width: calc(33.333% - 20px);
}

.product-image {
  max-width: 100%;
  height: auto;
}

.product-info {
  margin-top: 10px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar,
  .product-list {
    flex: none;
    width: 100%;
    height: auto;
    margin: 0;
  }

  .products {
    justify-content: center;
  }

  .product-item {
    width: 100%;
  }
}
</style>
