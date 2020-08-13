<template>
  <div class="mine-layout">
    <div class="header-layout">
      <section class="mine-header">
        <img v-if="userInfo.headImageUrl" :src="userInfo.headImageUrl" class="header-image" />
        <img v-else src="../../assets/image/setting/logo.png" class="header-image" />
        <ul v-if="token" class="user-info">
          <li class="user-name">{{userInfo.nickName}}</li>
          <li class="node-info">
            <span v-if="nodeName" class="sharing-node" @click="toShow">{{nodeName}}</span>
          </li>
        </ul>
      </section>
      <section class="my-info">
        <ul class="info-list">
          <li class="info-item">
<!--            <b>{{userInfo.goodsAttention}}</b>-->
            <span>手机号</span>
            <b>{{userPhone}}</b>
          </li>
          <li class="info-item">
            <span>积分</span>
<!--            <b>{{userInfo.footAttention}}</b>-->
            <b>{{exchangeType}}</b>
          </li>

        </ul>
      </section>
    </div>

    <section class="order-all">
      <span class="look-orders"></span>
      <ul class="order-list">
        <li class="order-item" @click="showOrder()">
          <svg-icon icon-class="pending-receipt"></svg-icon>
          <span>兑换历史</span>
        </li>
        <!--<router-link to="/order/refundAfterSale" class="order-item" tag="li">
          <svg-icon icon-class="all-orders"></svg-icon>
          <span>退换/售后</span>
        </router-link>-->
      </ul>
    </section>

    <section class="mine-content">
      <ul class="options-list">
        <router-link to="/mine/shippingAddress" class="option-item" tag="li">
          <div class="item-info">
            <svg-icon class="incon" icon-class="shipping-address"></svg-icon>
            <span>收货地址</span>
          </div>
          <van-icon name="arrow" color="#DBDBDB" />
        </router-link>
      </ul>
    </section>

    <tabbar></tabbar>
  </div>
</template>

<script>
import fetch from '../../lib/fetch'
import qs from 'qs'

export default {
  name: 'mine',
  data () {
    return {
      userPhone:userPhone,
      exchangeType:exchangeType,
      show: false,
      nodeName: '',
      userInfo: {},
      merchantsSettledStatus: null, // 商家入驻消息
      token: localStorage.token,
      columns: 1,
    }
  },
  computed: {},
  mounted () {
    this.$eventBus.$emit('changeTag', 3)
  },
  methods: {
    showOrder(){
      this.$router.push({
        path: `/order/orderDetail`
      })
    },
    handleClose () {
      this.show = false
    },
    toShow () {
      this.show = true
    }
  }
}
</script>

<style scoped lang="scss">
.mine-layout {
  min-height: 300px;
  padding-bottom: 50px;
  /*.header-layout:after {
    width: 100%;
    position: absolute;
    height: 218px;
    left: -20%;
    top: 0;
    z-index: -1;
    content: "";
    border-radius: 0 0 35% 35%;
    background: linear-gradient(#ec3924, #ff7428);
  }*/
  .header-layout {
    padding: 30px 16px;
    height: 218px;
    width: 100%;
    /*position: absolute;*/
    left: -20%;
    top: 0;
    z-index: -1;
    content: "";
    border-radius: 0 0 15% 15%;
    background: linear-gradient(#ec3924, #ff7428);
    .mine-header {
      display: flex;
      padding-left: 24px;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      padding-bottom: 10px;
      .header-image {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
      .user-info {
        padding-left: 16px;
        font-size: 15px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .node-info {
          padding-top: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .sharing-node {
            padding-left: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 78px;
            height: 25px;
            font-size: 11px;
            text-align: center;
            background-size: 100% 100%;
            border-radius: 11px 11px;
          }
          .business-node {
            margin-left: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 60px;
            height: 22px;
            font-size: 11px;
            text-align: center;
            background-color: #71c0f6;
            border-radius: 11px 11px;
          }
        }
      }

      .login-regist {
        font-size: 15px;
        color: #fff;
        padding-left: 16px;
      }
    }
    .my-info {
      font-size: 13px;
      color: #fff;
      // padding-bottom: 16px;
      .info-list {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .info-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: left;
          b {
            font-size: 16px;
          }
        }
      }
    }
  }

  .ticket-all {
    margin: 0 16px;
    margin-top: -50px;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    .look-orders {
      font-size: 11px;
      font-weight: 600;
      color: #3a3a3a;
      padding-left: 19px;
      padding-top: 14px;
      padding-bottom: 18px;
    }
    .ticket-list {
      padding-bottom: 18px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .ticket-item {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          padding-top: 5px;
          font-weight: 600;
        }
      }
    }
  }

  .order-all {
    margin: 0 16px;
    margin-top: 20px;
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    .look-orders {
      font-size: 11px;
      font-weight: 600;
      color: #3a3a3a;
      padding-left: 19px;
      padding-top: 14px;
      padding-bottom: 18px;
    }
    .order-list {
      padding-bottom: 18px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .order-item {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          padding-top: 5px;
          font-weight: 600;
        }
      }
    }
  }
  .mine-content {
    box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px;
    padding: 0 16px;
    margin: 0 16px;
    margin-top: 18px;
    .options-list {
      padding-top: 20px;
      .option-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        padding-bottom: 22px;
        .item-info {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 15px;
          color: #888;
          .incon {
            padding-right: 16px;
          }
          .header-img {
            width: 50px;
            height: 50px;
            padding-right: 16px;
          }
        }
        .merchants-status {
          font-size: 13px;
          color: #dbdbdb;
          margin-left: auto;
          padding-right: 10px;
        }
      }
    }
  }
  .node-dialog {
    .dialog-header {
      text-align: center;
    }
    .my-node-data {
      padding: 10px 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      .data-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-left: 10px;
        margin-bottom: 20px;
        .node-text {
          font-size: 13px;
          padding-top: 5px;
          color: #3a3a3a;
        }
      }
    }
    .node-bottom {
      position: relative;
      .know-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        line-height: 40px;
        width: 154px;
        border-radius: 20px 20px;
        background-color: #fce14b;
        margin-bottom: 30px;
      }
      .gray-img {
        position: absolute;
        right: 12px;
        top: 0;
      }
    }
  }
}
</style>
