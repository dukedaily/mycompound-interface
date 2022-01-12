<template>
  <div class="wallet-container">
    <div class="wallet-wrap">
      <WalletHead :title="title" />
      <div class="wallet-item"
           @click="handleWalletClick">
        <div class="item-left">
          <img class="net-img"
               :src="usdcImg"
               alt="">
          <span class="net-name">MetaMask</span>
        </div>
        <img class="right-img"
             :src="iconRight"
             alt="">
      </div>
      <div class="text">
        <span>New to ?</span>
        <span class="yellow"> Learn more about wallets</span>
      </div>
      <DialogClose />
    </div>
  </div>
</template>

<script>
import DialogClose from 'comp/WalletDialog/DialogClose.vue'
import WalletHead from 'comp/WalletDialog/WalletHead.vue'
export default {
  components: {
    DialogClose,
    WalletHead
  },
  data () {
    return {
      title: 'Connect Wallet',
      usdcImg: require('img/usdc.png'),
      iconRight: require('img/icon-right.png')
    }
  },
  methods: {
    handleWalletClick () {
      this.$store.dispatch('connetWallet')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/dialog.less";
.wallet-wrap {
  width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .wallet-item {
    width: 480px;
    height: 80px;
    margin-top: 50px;
    background: #363636;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    cursor: pointer;
    .item-left {
      display: flex;
      align-items: center;
      & > img {
        width: 48px;
        height: 46px;
      }
      span {
        margin-left: 20px;
        font-size: 16px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .right-img {
      width: 28px;
      height: 18px;
    }
  }
  .wallet-item:hover {
    opacity: 0.8;
  }
  .text {
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    span {
      font-size: 14px;
      font-family: DINPro;
      font-weight: 400;
      color: #999999;
    }
    .yellow {
      color: #f0b90b;
      margin-left: 6px;
    }
  }
}
</style>