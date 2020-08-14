<template>
  <!-- 产品 -->
  <div class="product-detail-page">
    <cm-header>
        <span slot="left" @click="goBack()">
          <svg-icon icon-class="white-btn"></svg-icon>
        </span>
      <i class="name">{{productDetail.brandName}}</i>
    </cm-header>
    <img class="product-img" v-for="(item,index) in imgList" :src="'http:'+item">
  </div>
</template>

<script>
  import fetch from '../../lib/fetch'
  import qs from 'qs'

  export default {
    name: 'detail',
    data () {
      return {
        productDetail: {},
        imgList: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      goBack () {
        this.$router.push({
          path: `/order/confirmOrder`,
          query:{
            programId:this.$route.query.programId,
            addressId:this.$route.query.addressId
          }
        })
      },
      async initData () {
        const params = {
          jdSkuCode: this.$route.query.jdSku,
        }
        const res = await fetch(`/mobile/voucher/getJdProductDetail`, qs.stringify(params))
        if (res) {
          this.productDetail = res
          this.imgList = JSON.parse(res.wxintroduction)
        }
      },

    }
  }
</script>

<style scoped lang="scss">
  .product-detail-page {
    .name {
      display: inline-block;
      max-width: 80%;
    }

    .product-img {
      max-width: 100%;
    }
  }
</style>
