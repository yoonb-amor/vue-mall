<template>
  <div>
    <section class="product-all">
      <router-link to="/product" class="look-orders" tag="span">查看全部兑换券>></router-link>
      <ul class="ticket-list">
        <router-link :to="`/product?type=1`" class="ticket-item" tag="li">
          <svg-icon icon-class="pending-pay"></svg-icon>
          <span>待使用</span>
        </router-link>
        <router-link :to="`/product?type=2`" class="ticket-item" tag="li">
          <svg-icon icon-class="be-delivered"></svg-icon>
          <span>已使用</span>
        </router-link>
        <router-link :to="`/product?type=3`" class="ticket-item" tag="li">
          <svg-icon icon-class="pending-receipt"></svg-icon>
          <span>过期关闭</span>
        </router-link>
      </ul>
    </section>
  </div>
</template>

<script>
    export default {
        name: "fjindex"
    }
</script>

<style scoped>

</style>
