<template>
  <div class="wallet-head">
    <div class="wallet-wrap">
      <div class="head-left">
        <span>{{title}}</span>
      </div>
      <div class="head-right">
        <div class="circle">
          <div class="circle-inner"></div>
        </div>
        <span>Ethereum</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
      default: 'Connect Wallet'
    }
  }
}
</script>

<style lang="less" scoped>
.wallet-head {
  width: 100%;
  height: 111px;
  padding: 34px 40px 0;
  .wallet-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 31px 0;
    border-bottom: 1px solid #4a4747;
    .head-left {
      span {
        font-size: 20px;
        font-family: DINPro;
        font-weight: 500;
        color: #f0b90b;
      }
    }
    .head-right {
      position: relative;
      .circle {
        position: absolute;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        background: #4c4c4c;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2px;
        .circle-inner {
          width: 5px;
          height: 5px;
          background: #f0b90b;
          border-radius: 50%;
        }
      }
      span {
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        line-height: 16px;
        vertical-align: center;
      }
    }
  }
}
</style>