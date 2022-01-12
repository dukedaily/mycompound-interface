<template>
  <div class="dialog-head">
    <div class="title-wrap">
      <span>{{titleName}}</span>
      <div class="title-right"
           v-if="ifShowRight || !isSingle">
        <img class="coin-img"
             :src="getImg(marginImg)"
             alt="">
        <img class="icon-right"
             :src="rightImg"
             alt="">
        <img class="coin-img"
             :src="getImg(swapImg)"
             alt="">
        <div class="right-content">
          <span>{{marginName}}</span>
          <span>/</span>
          <span>{{swapName}}</span>
        </div>
      </div>
      <div class="title-right"
           v-else>
        <img class="coin-img"
             :src="iconImg"
             alt="">
        <div class="right-content">
          <span>{{coinName}}</span>
        </div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import { getCoinImg } from 'utils/index.js'
export default {
  props: {
    titleName: {
      type: String,
      require: true
    },
    ifShowRight: {
      type: Boolean,
      require: false
    },
    isSingle: {
      type: Boolean,
      require: false
    },
    iconImg: {
      type: String,
      require: true
    },
    coinName: {
      type: String,
      require: true
    },
    marginImg: {
      type: String
    },
    swapImg: {
      type: String
    },
    marginName: {
      type: String
    },
    swapName: {
      type: String
    }
  },
  data () {
    return {
      wethImg: require('img/weth.png'),
      rightImg: require('img/icon-right.png'),
      usdtImg: require('img/usdt.png')
    }
  },
  methods: {
    /**
     * 获取币种图标
     */
    getImg (address) {
      return getCoinImg(address)
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-head {
  width: 557px;
  height: 113px;
  padding: 0 40px;
  background-image: url("../../assets/images/head-bg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .line {
    width: 100%;
    height: 1px;
    background-color: #4a4747;
  }
  .title-wrap {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > span {
      font-size: 20px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
    .title-right {
      display: flex;
      align-items: center;
      .coin-img {
        width: 36px;
        height: 36px;
      }
      .icon-right {
        width: 17px;
        height: 11px;
        margin: 0 4px;
      }
      .right-content {
        display: flex;
        margin-left: 5px;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>