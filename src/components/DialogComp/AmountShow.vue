<template>
  <div class="amount-show">
    <p>{{titleName}}</p>
    <div class="show-content">
      <div class="content-left">
        <img :src="usdtImg"
             alt="">
        <span>USDT</span>
      </div>
      <div class="content-mid">
        <span>12.34</span>
        <span>%</span>
      </div>
      <div class="content-right">
        <span>100,234.23</span>
        <img :src="rightImg"
             alt="">
        <span>100,234.23</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      usdtImg: require('img/usdt.png'),
      rightImg: require('img/icon-right.png')
    }
  }
}
</script>

<style lang="less" scoped>
.amount-show {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  & > p {
    font-size: 14px;
    font-family: DINPro;
    font-weight: 500;
    color: #ffffff;
    opacity: 0.6;
    text-align: left;
  }
  .show-content {
    margin-top: 20px;
    width: 100%;
    background: #4a4545;
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .content-left {
      display: flex;
      align-items: center;
      & > img {
        width: 28px;
        height: 28px;
      }
      & > span {
        margin-left: 8px;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .content-mid {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
      opacity: 0.6;
    }
    .content-right {
      display: flex;
      align-items: center;
      & > span {
        font-size: 12px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
      & > img {
        width: 13px;
        height: 9px;
        margin: 0 2px;
      }
    }
  }
}
</style>