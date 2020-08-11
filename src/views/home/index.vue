<template>
  <div class="home">
    <header class="header">
      <span>福建移动充值大礼包-超值兑换</span>
      <img src="../../assets/image/fj/index.png">
    </header>
    <section v-if="list60&&list60.byUnicomPrograms&&list60.byUnicomPrograms.length>0" class="spike-area spike-area-bg-1">
      <div class="spike-icon">
        <img src="../../assets/image/fj/icon1.png">
        <span class="span1">价值60元礼包&nbsp;<span class="span2">(仅需50元, 就送60元超值礼包)</span></span>
      </div>
      <section class="grid">
          <div v-for="(item,index) in list60.byUnicomPrograms" :key="index" class="product bg-color-1">
            <div class="product__info">
              <img class="product__image" :src="'http://localhost:8080/'+item.imagePath"/>
              <img  class="product__image__btn" src="../../assets/image/fj/buy-btn.png"/>
              <span v-on:click="goBuy(item)" class="action_text">立即兑换</span>
            </div>
          </div>
      </section>
    </section>

    <section v-if="list120&&list120.byUnicomPrograms&&list120.byUnicomPrograms.length>0" class="spike-area spike-area-bg-2">
      <div class="spike-icon">
        <img src="../../assets/image/fj/icon2.png">
        <span class="span1">价值120元礼包&nbsp;<span class="span2">(仅需100元, 就送120元超值礼包)</span></span>
      </div>
      <section class="grid">
        <div v-for="(item,index) in list120.byUnicomPrograms" :key="index" class="product bg-color-2">
          <div class="product__info">
            <img class="product__image" :src="'http://localhost:8080/'+item.imagePath"/>
            <img  class="product__image__btn" src="../../assets/image/fj/buy-btn.png"/>
            <span v-on:click="goBuy(item)" class="action_text">立即兑换</span>
          </div>
        </div>
      </section>
    </section>

    <section v-if="list200&&list200.byUnicomPrograms&&list200.byUnicomPrograms.length>0" class="spike-area spike-area-bg-1">
      <div class="spike-icon">
        <img src="../../assets/image/fj/icon3.png">
        <span class="span1">价值200元礼包&nbsp;<span class="span2">(仅需100元, 就送120元超值礼包)</span></span>
      </div>
      <section class="grid">
        <div v-for="(item,index) in list200.byUnicomPrograms" :key="index" class="product bg-color-1">
          <div class="product__info">
            <img class="product__image" :src="'http://localhost:8080/'+item.imagePath"/>
            <img  class="product__image__btn" src="../../assets/image/fj/buy-btn.png"/>
            <span v-on:click="goBuy(item)" class="action_text">立即兑换</span>
          </div>
        </div>
      </section>
    </section>

    <section v-if="list300&&list300.byUnicomPrograms&&list300.byUnicomPrograms.length>0" class="spike-area spike-area-bg-2">
      <div class="spike-icon">
        <img src="../../assets/image/fj/icon4.png">
        <span class="span1">价值300元礼包&nbsp;<span class="span2">(仅需100元, 就送120元超值礼包)</span></span>
      </div>
      <section class="grid">
        <div v-for="(item,index) in list300.byUnicomPrograms" :key="index" class="product bg-color-1">
          <div class="product__info">
            <img class="product__image" :src="'http://localhost:8080/'+item.imagePath"/>
            <img  class="product__image__btn" src="../../assets/image/fj/buy-btn.png"/>
            <span v-on:click="goBuy(item)" class="action_text">立即兑换</span>
          </div>
        </div>
      </section>
    </section>

    <!--<section class="spike-area spike-area-bg-2">
      <div class="spike-icon">
        <img src="../../assets/image/fj/icon2.png">
        <span class="span1">价值120元礼包&nbsp;<span class="span2">(仅需100元, 就送120元超值礼包)</span></span>
      </div>
      <section class="grid">
        <div class="product bg-color-2">
          <div class="product__info">
            <img class="product__image" src="../../assets/image/fj/02.png" alt="Product 1"/>
            <img class="product__image__btn" src="../../assets/image/fj/buy-btn.png"/>
            <span class="action&#45;&#45;text">立即兑换</span>
          </div>
        </div>
      </section>
    </section>-->

    <tabbar></tabbar>
  </div>
</template>

<script>
  import fetch from '../../lib/fetch'
  import qs from 'qs'

  export default {
    name: 'index',
    data () {
      return {
        systemMessage: {},
        mallMessage: {},
        package:[],
        list60:{},
        list120:{},
        list200:{},
        list300:{},
      }
    },
    created () {
      this.getPackages();
    },
    methods: {
      async getPackages(){
        const params={
          userPhone:userPhone,
          accessToken:accessToken
        };
        const res= await fetch(`/page/exchange/showPackages`,qs.stringify(params))
        if(!(res.code=="0000")){
          this.$toast({
            mask: false,
            message: res.message
          })
          return
        }
        this.package=res.data;
        this.doPackageData()
      },
      doPackageData(){
          this.list60=this.package[0];
          this.list120=this.package[1];
      },
      goBuy:function (item) {
        this.$router.push({
          path: `/order/confirmOrder`,
          query: {
            // planId:this.$route.query.planId,
            programId:item.programId,
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    .header {
      span {
        width: 100%;
        height: 24px;
        font-size: 14px;
        line-height: 24px;
        display: block;
        background: #ff2f56;
        text-align: center;
        color: #ffffff;
        margin-bottom: 5px;
      }

      img {
        width: 100%;
      }
    }

    .spike-area-bg-1 {
      background: url("../../assets/image/fj/bg1.png");
    }

    .spike-area-bg-2 {
      background: url("../../assets/image/fj/bg2.png");
    }

    .spike-area {
      margin: 10px 10px;
      box-sizing: border-box;
      border-radius: 10px;

      .spike-icon {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 8px;

        img {
          margin-right: 5px;
          width: 20px;
        }

        .span1 {
          font-size: 18px;

          .span2 {
            font-size: 12px;
          }
        }
      }

      .grid {
        isplay: -webkit-flex;
        display: flex;
        -webkit-flex-direction: row;
        -ms-flex-direction: row;
        flex-direction: row;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: flex-start;
        -webkit-align-content: stretch;
        align-content: stretch;
        -webkit-align-items: flex-start;
        -ms-flex-align: start;
        align-items: flex-start;

        .bg-color-1 {
          background: url("../../assets/image/fj/p-bg-1.png") no-repeat;
          background-size: 100% 100%;
        }

        .bg-color-2 {
          background: url("../../assets/image/fj/p-bg-2.png") no-repeat;
          background-size: 100% 100%;
        }

        .product {
          position: relative;
          vertical-align: top;
          margin: 0 4px 10px;
          padding: 10px 0 25px 0;
          border-radius: 10px;
          display: block;
          flex: 0 0 110px;

          .product__info {
            .product__image {
              display: block;
              margin: 0 auto;
              max-width: 80px;
              max-height: 70px;
              -webkit-transform-origin: 50% 100%;
              transform-origin: 50% 100%;
            }

            .product__image__btn {
              display: block;
              margin: 0 auto;
              position: absolute;
              top: 90px;
              left: 20px;
              width: 70px;
            }

            .action_text {
              color: #fff;
              position: absolute;
              top: 92px;
              display: block;
              left: 28px;
              font-size: 12px;
            }
          }

        }

      }

    }
  }
</style>
