<template>
  <!-- 确认订单 -->
  <div class="order-detail-page">
    <cm-header>
      <span slot="left" @click="goBack()">
        <svg-icon icon-class="white-btn"></svg-icon>
      </span>
      <i>确认订单</i>
    </cm-header>
    <section class="order-info" @click="handleToChooseAddress">
      <ul class="info-list">
        <li class="receiver-addres">
          <div class="address-content">
            <div v-if="addressId">
              <svg-icon icon-class="shipping-address"></svg-icon>
              <span class="address-userName">{{addressData.consignee}}</span>
              <span class="address-userPhone">{{addressData.phone}}</span>
              <span class="address-fullAddress" >{{addressData.allAreaName}}-{{addressData.streetAddress}}</span>
            </div>
            <span class="address-fullAddress" v-else>请选择收货人地址</span>
          </div>
          <svg-icon class="arrow-icon-right" icon-class="arrow-icon-right"></svg-icon>
        </li>
      </ul>
      </section>

    <section class="order-card" v-if="packageDetail!=null">
      <div class="product bg-color-2">
        <img class="product__image" :src="DEFAULT_HTTP_URL+packageDetail.byUnicomPrograms[0].imagePath"/>
        <div class="product__info">
          <span class="product__info_name">{{packageDetail.packageType}}</span>
          <span v-for="(item,index) in packageDetail.byUnicomPrograms[0].byUnicomCommodities">
            <span>{{item.jdProductName}}</span>
          </span>
        </div>
        <div class="pay-count">
        <span>
          共{{packageDetail.byUnicomPrograms[0].byUnicomCommodities.length}}件商品
          <!--<i>，小计：￥{{ packageDetail.packagePrice}}</i>-->
        </span>
        </div>
      </div>
    </section>
    <section>

    </section>
    <div class="pay-btn">
      <van-button type="danger" @click="handleSubmitOrder" size="large">立即兑换</van-button>
    </div>
  </div>
</template>

<script>
  import { DEFAULT_HTTP_URL } from '../../config/index'
  import fetch from '../../lib/fetch'
  import qs from 'qs'

  export default {
    name: 'ConfirmOrder',
    data () {
      return {
        DEFAULT_HTTP_URL:DEFAULT_HTTP_URL,
        programId: '',
        addressId:'',
        addressData:{},
        packageDetail:{},
        orderForm: {},
        columns: 1,
        orderNo: '',
        cartMode: true, // 购物车的模式，true 是显示出编辑按钮 false 是显示完成按钮,默认是false;
      }
    },
    created () {
      // this.initData()
      this.getPackageDetail()
      this.getAddress()
    },
    methods: {
      goBack(){
        this.$router.push({
          path: `/index`,
        })
      },
      async getPackageDetail () {
        this.programId = this.$route.query.programId
        let params = { programId: this.programId,
          userPhone:userPhone,
          accessToken:accessToken
        }
        const res = await fetch(`/page/exchange/packageDetails`, qs.stringify(params))
        if(!(res.code=="0000")){
          this.$toast({
            mask: false,
            message: res.message
          })
          return
        }
        this.packageDetail=res.data;
      },
      async getAddress(){
        if(!this.$route.query.addressId){
          return ;
        }
        this.addressId = this.$route.query.addressId
        let params = { addressId: this.addressId,
          userPhone:userPhone,accessToken:accessToken}
        const res = await fetch(`/page/exchange/detail`, qs.stringify(params))
        if(!(res.code=="0000")){
          this.$toast({
            mask: false,
            message: res.message
          })
          return
        }
        this.addressData=res.data;
      },
      async handleSubmitOrder () {
        if (!this.$route.query.addressId) {
          this.$toast({
            mask: false,
            duration: 2000,
            message: '请选择收货地址！'
          })
          return
        }
        this.$toast.loading({
          mask: true,
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '订单提交中...'
        })
        const params={};
        params.userPhone=userPhone;
        params.accessToken=accessToken;
        params.programId=this.$route.query.programId;
        params.addressId=this.$route.query.addressId;
        params.exchangeType=exchangeType;
        const res= await fetch(`/page/exchange/settlementExchange`,qs.stringify(params))
        if(!(res.code=="0000")){
          this.$toast({
            mask: false,
            message: res.message
          })
          return
        }

        const orderNumber=res.data;
        this.$router.push({
          path: `/order/orderDetail`,
          query: {
            orderNumber:orderNumber,
          }
        })
      },
      handleToChooseAddress () {
        this.$router.push({
          path: `/order/chooseAddress`,
          query: {
            programId:this.$route.query.programId,
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .order-detail-page {
    height: 100%;
    padding: 0 16px;

    .order-card {
      background-color: #fff;
      border-radius: 5px;
      padding: 10px 20px;
      margin-top: 20px;

      .product{
        width: 100%;
        overflow: auto;
        max-height: 400px;
        .product__image{
          width: 100%;
          display: block;
        }
        .product__info{
            width: 100%;
          .product__info_name{
            color: #9b9b9b;
            font-size: 14px;
            display: block;
          }
        }
        .pay-count {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          padding: 10px 0px 20px 0px;

          i {
            color: #ec3924;
            font-weight: 700;
          }
        }
        span{
          font-size: 16px;
          display: block;
        }
      }

      .order-list {
        .list-item {
          display: flex;
          justify-content: space-between;

          & > span {
            color: #ec3924;
            font-size: 11px;
          }

          .store-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 10px;

            .header-img {
              width: 24px;
              height: 24px;
              border-radius: 50%;
            }

            span {
              color: #3a3a3a;
              padding-left: 3px;
              font-weight: 600;
              font-size: 13px;
            }
          }
        }

        .item-info {
          padding-top: 10px;
          display: flex;
          justify-content: space-between;

          img {
            width: 80px;
            height: 80px;
            display: inline-block;
            background-color: #ec3924;
            border-radius: 4px;
          }

          .order-detail {
            flex: 1;
            padding-left: 16px;
            padding-bottom: 4px;

            .info-one,
            .info-two {
              display: flex;
              justify-content: space-between;
              font-size: 13px;
            }

            .info-one {
              color: #3a3a3a;
              padding-bottom: 5px;

              .product-name {
                width: 150px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }

            .info-two {
              color: #949497;
            }
          }
        }

        .order-count {
          display: flex;
          justify-content: flex-end;
          font-size: 13px;
          color: #949497;
        }

        .real-pay {
          display: flex;
          justify-content: flex-end;
          font-size: 13px;
          font-weight: 600;
          padding-top: 4px;

          i {
            color: #ec3924;
            padding-left: 5px;
          }

          span {
            color: #3a3a3a;
          }
        }
      }
    }

    .order-info {
      background-color: #fff;
      border-radius: 5px;
      margin-top: 20px;
      padding: 20px;

      .info-list {
        color: #3a3a3a;

        .info-title {
          display: flex;
          font-weight: 600;
          justify-content: flex-start;
          align-items: center;

          span {
            font-size: 13px;
            padding-left: 7px;
            font-weight: 700;
          }
        }

        .info-item {
          font-size: 11px;
          padding-left: 34px;
          padding-bottom: 6px;
        }

        .receiver-addres {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .address-content {
            color: #3a3a3a;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .address-userName {
              font-size: 13px;
              font-weight: 700;
              padding-left: 10px;
            }
            .address-userPhone {
              font-size: 13px;
              font-weight: 700;
              padding-left: 10px;
            }
            .address-fullAddress {
              font-size: 13px;
              font-weight: 700;
              padding-left: 10px;
            }
          }

          .arrow-icon-right {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .pay-btn {
      position: fixed;
      width: 100%;
      bottom: 10px;
      left: 0;
      right: 0;
      padding: 0 16px;

      /deep/ .van-button--danger {
        background-color: #ec3924;
        line-height: 44px;
        font-size: 18px;
        border-radius: 4px;
      }
    }
  }
</style>
