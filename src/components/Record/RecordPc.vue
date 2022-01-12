<template>
  <div class="record-container">
    <div class="wrap title">
      <div class="column trade">
        Token Trade
      </div>
      <div class="column asset">
        Asset
      </div>
      <div class="column debt">
        Debt
      </div>
      <div class="column risk">
        Risk
      </div>
    </div>
    <div class="wrap item"
         v-for="(item, index) in recordLists"
         :key="index">
      <div class="column trade">
        <img class="coin-img"
             :src="item.usdcImg"
             alt="">
        <img class="arrow-right"
             :src="iconRightImg"
             alt="">
        <img class="coin-img"
             :src="item.usdcImg"
             alt="">
      </div>
      <div class="column asset">
        <span>{{item.assetAmount}}</span>
        <span>{{item.assetCount}}</span>
      </div>
      <div class="column debt">
        <span>{{item.debtAmount}} USDT</span>
        <span>${{item.debtCount}}</span>
      </div>
      <div class="column risk">
        <span>{{item.riskNum}}</span>
        <img :src="item.sigleImg"
             alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sigleGreenImg: require('img/sigle-green.png'),
      usdcImg: require('img/usdc.png'),
      iconRightImg: require('img/icon-right.png'),
      recordLists: [
        {
          usdcImg: require('img/usdc.png'),
          assetAmount: '100,234',
          assetCount: '100,234',
          debtAmount: '100,234',
          debtCount: '100,234',
          riskNum: '30.34',
          sigleImg: require('img/sigle-green.png'),
        },
        {
          usdcImg: require('img/usdc.png'),
          assetAmount: '100,234',
          assetCount: '100,234',
          debtAmount: '100,234',
          debtCount: '100,234',
          riskNum: '60.34',
          sigleImg: require('img/sigle-yellow.png'),
        },
        {
          usdcImg: require('img/usdc.png'),
          assetAmount: '100,234',
          assetCount: '100,234',
          debtAmount: '100,234',
          debtCount: '100,234',
          riskNum: '90.34',
          sigleImg: require('img/sigle-red.png'),
        },
        {
          usdcImg: require('img/usdc.png'),
          assetAmount: '100,234',
          assetCount: '100,234',
          debtAmount: '100,234',
          debtCount: '100,234',
          riskNum: '60.34',
          sigleImg: require('img/sigle-yellow.png'),
        },
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.record-container {
  padding: 0 20px;
  position: relative;
  .wrap {
    display: flex;
    align-items: center;
    padding: 0 22px 0 11px;
    .column {
      font-size: 16px;
      font-family: DINPro;
      font-weight: 400;
      color: #ffffff;
    }
    .trade {
      width: 204px;
    }
    .asset {
      width: 187px;
    }
    .debt {
      width: 204px;
    }
  }
  .title {
    height: 48px;
  }
  .item {
    display: flex;
    align-items: center;
    height: 80px;
    .trade {
      display: flex;
      align-items: center;
      .coin-img {
        width: 36px;
        height: 36px;
      }
      .arrow-right {
        width: 16px;
        height: 11px;
        margin-left: 3px;
        margin-right: 3px;
      }
    }
    .asset,
    .debt {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span:first-child {
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
      span:last-child {
        margin-top: 11px;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.4;
      }
    }
    .risk {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      & > span {
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
      & > img {
        width: 19px;
        height: 17px;
        margin-top: 9px;
      }
    }
  }
}
</style>