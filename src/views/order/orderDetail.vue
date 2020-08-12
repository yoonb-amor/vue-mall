<template>
  <!-- 订单详情 -->
  <div class="order-detail-page">
    <cm-header>
      <span slot="left" @click="goBack()">
        <svg-icon icon-class="white-btn"></svg-icon>
      </span>
      <i>订单详情</i>
    </cm-header>
    <div v-if="!showOrderFlag" class="empty-box">
      <svg-icon icon-class="refund-after-sale" class="order-empty"></svg-icon>
      <span class="empty-text">
        <i>未发现兑换记录</i>
      </span>
    </div>
    <div v-if="showOrderFlag">
      <section class="order-info">
        <ul class="info-list">
          <li class="receiver-addres">
            <svg-icon icon-class="shipping-address"></svg-icon>
            <div class="address-content">
              <label>收货人：{{orderFormData.orderShipping.receiverName}}
                {{orderFormData.orderShipping.receiverMobile}}</label>
              <span>{{orderFormData.orderShipping.receiverAddress}}</span>
            </div>
          </li>
        </ul>
      </section>

      <section class="order-card">
        <ul class="order-list">
          <li class="list-item">
            <div class="store-info">
              <span>订单号：{{orderFormData.orderNumber }}</span>
            </div>
            <span>{{orderFormData.gmtCreate}}</span>
          </li>

          <li
            class="item-info"
            v-for="(appOrderProduct,index) in orderFormData.orderItems"
            :key="index"
          >
            <img v-lazy="appOrderProduct.productImg"/>
            <div class="order-detail">
              <p class="info-one">
                <span class="product-name">{{appOrderProduct.productStyle}}</span>
                <b>￥{{appOrderProduct.jdPrice}}</b>
              </p>
              <p class="info-two">
                <span>{{appOrderProduct.skuName}}</span>
                <span>×{{appOrderProduct.num}}</span>
              </p>
            </div>
          </li>

          <li class="order-count">
            <span>订单总价：</span>
            <i>￥{{orderFormData.jdPrice}}</i>
          </li>
          <li class="real-pay">
            <span>实付款：</span>
            <i>￥{{orderFormData.payment}}</i>
          </li>
        </ul>
      </section>

      <section class="order-info"">
        <ul class="info-list">
          <li class="info-title">
            <svg-icon icon-class="order-info"></svg-icon>
            <span>京东快递运单号:{{waybillCode[0].deliveryOrderId}}</span>
          </li>
          <li
            class="info-item"
            v-for="(item,index) in orderTrack.reverse()"
            :key="index"
          >
            <span>{{item.msgTime}}</span>
            <label>{{item.content}}</label>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
  import fetch from '../../lib/fetch'
  import qs from 'qs'

  export default {
    name: 'orderDetail',
    data () {
      return {
        columns: 1,
        orderFormData: {},
        orderNumber: '',
        orderTrack: [],
        waybillCode: [],
        jdOrderId: '',
        showOrderFlag: false,
      }
    },
    created () {
      this.initData()
    },
    methods: {
      goBack () {
        this.$router.push({
          path: `/mine`
        })
      },
      async initData () {
        const params = {
          userPhone: userPhone,
          accessToken: accessToken
        }
        const res = await fetch(`/page/exchange/trackingExchange`, qs.stringify(params))
        if (!(res.code == '0000')) {
          this.$toast({
            mask: false,
            message: res.message
          })
          return
        }
        if (res.data && res.data.rows.length > 0) {
          this.showOrderFlag = true
          this.orderFormData = res.data.rows[0]
          await this.getWuLiu()
        }

      },
      async getWuLiu () {
        const orderNum = this.orderNumber ? this.orderNumber : this.orderFormData.orderNumber
        const params = {
          userPhone: userPhone,
          accessToken: accessToken,
          orderNumber: orderNum
        }
        const res = await fetch(`/page/exchange/logisticsExchange`, qs.stringify(params))
        if (!(res.code == '0000')) {
          this.$toast({
            mask: false,
            message: res.message
          })
          return
        }
        this.orderTrack = res.data.orderTrack
        this.waybillCode = res.data.waybillCode

        /*this.orderTrack=[
          {
            "msgTime": "2020-06-30 13:14:11",
            "content": "您提交了订单，请等待系统确认",
            "operator": "客户"
          },
          {
            "msgTime": "2020-06-30 13:14:34",
            "content": "您的订单已经进入京东合肥仓库准备出库",
            "operator": "系统"
          },
          {
            "msgTime": "2020-06-30 13:14:34",
            "content": "您的订单预计2020-06-30 13:14开始处理，请您耐心等待",
            "operator": "系统"
          },
          {
            "msgTime": "2020-06-30 13:14:50",
            "content": "温馨提示：您的订单预计7月1日09:00-15:00送达您手中",
            "operator": "系统"
          },
          {
            "msgTime": "2020-06-30 13:23:53",
            "content": "您的订单已经打印完成",
            "operator": "zhouhuan30"
          },
          {
            "msgTime": "2020-06-30 13:53:03",
            "content": "拣货完成",
            "operator": "张有艳"
          },
          {
            "msgTime": "2020-06-30 16:32:22",
            "content": "扫描完成",
            "operator": "刘淑玲"
          },
          {
            "msgTime": "2020-06-30 16:32:22",
            "content": "打包完成",
            "operator": "京东打包员"
          },
          {
            "msgTime": "2020-06-30 16:46:22",
            "content": "您的订单在京东【合肥分拣中心】分拣完成",
            "operator": "樊恒友"
          },
          {
            "msgTime": "2020-06-30 17:37:40",
            "content": "您的订单由京东【合肥分拣中心】送往【合肥海恒营业部】",
            "operator": "方秀添"
          },
          {
            "msgTime": "2020-07-01 07:19:29",
            "content": "您的订单已到达京东【合肥海恒营业部】",
            "operator": "张帅"
          },
          {
            "msgTime": "2020-07-01 08:19:51",
            "content": "您的订单正在配送途中（快递员：李广健，电话：18297851504），请您耐心等待。 ",
            "operator": "李广健"
          },
          {
            "msgTime": "2020-07-01 13:24:35",
            "content": "您的订单已由本人签收。如有疑问您可以联系配送员【李广健，18297851504】确认。感谢您在京东购物，欢迎再次光临。",
            "operator": "李广健"
          }
        ];
        this.waybillCode=[
          {
            "parentId": 0,
            "orderId": 120265221406,
            "carrier": "京东快递",
            "deliveryOrderId": "JD0020121603282"
          }
        ];
        this.jdOrderId="120265221406";*/
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
              font-size: 10px;
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
          justify-content: flex-start;

          .address-content {
            padding-left: 7px;
            color: #3a3a3a;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;

            label {
              font-size: 13px;
              font-weight: 600;
            }

            span {
              padding-top: 4px;
              font-size: 11px;
            }
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

      .pay-count {
        display: flex;
        justify-content: space-between;
        color: #949497;
        font-size: 11px;
        padding-bottom: 12px;

        i {
          color: #ec3924;
          font-weight: 700;
        }
      }

      /deep/ .van-button--danger {
        background-color: #ec3924;
        line-height: 44px;
        font-size: 18px;
        border-radius: 4px;
      }
    }

    .empty-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 90px;

      .order-empty {
        width: 155px;
        height: 155px;
      }

      .empty-text {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 17px;
        color: #949497;
        padding-top: 10px;
      }
    }
  }
</style>
