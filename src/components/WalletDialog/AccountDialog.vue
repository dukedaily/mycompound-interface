<template>
  <div class="wallet-container">
    <div class="wallet-wrap">
      <WalletHead :title="title" />
      <div class="account-show">
        <p class="account">{{accountAddress}}</p>
        <p class="connect-tips">Connected with MetaMask</p>
      </div>
      <div class="card-wrap">
        <div class="card-item"
             v-for="(item, index) in cardLists"
             :key="index"
             @click="handleItemClick(index)">
          <img :src="item.cardImg"
               alt="">
          <span>{{item.cardName}}</span>
        </div>
      </div>
      <DialogClose />
    </div>
  </div>
</template>

<script>
import WalletHead from 'comp/WalletDialog/WalletHead.vue'
import DialogClose from 'comp/WalletDialog/DialogClose.vue'
import { walletDialogType } from 'utils/enum.js'
import types from 'types'
export default {
  components: {
    WalletHead,
    DialogClose
  },
  data () {
    return {
      title: 'Account',
      accountAddress: '0x1f692d5110a6a56548f1d3ae67dceae3e05ee615',
      cardLists: [
        {
          cardImg: require('img/copy.png'),
          cardName: 'Cope'
        },
        {
          cardImg: require('img/view.png'),
          cardName: 'View'
        },
        {
          cardImg: require('img/history.png'),
          cardName: 'History'
        },
        {
          cardImg: require('img/disconnect.png'),
          cardName: 'Diaconnect'
        },
      ]
    }
  },
  methods: {
    handleItemClick (index) {
      if (index === 0) { // copy 点击
        this.$copyText(this.accountAddress).then(e => {
          this.$message({ message: '复制成功', type: 'success' })
          console.log(e)
        }, err => {
          alert('复制失败')
          console.log(err)
        })
      } else if (index === 1) { // view 点击
        window.open(`https://kovan.etherscan.io/address/${this.accountAddress}`, '_self')
      } else if (index === 2) { // History
        this.$store.commit(types.WALLET_DIALOG_TYPE, '')
        this.$store.commit(types.WALLET_DIALOG_TYPE, walletDialogType.WALLET_HISTORY)
      } else { // Disconnect 
        this.handleDisconnect()
      }
    },
    /**
     * 断开连接的方法
     */
    handleDisconnect () {
      window.ethereum.on('disconnect', (msg) => {
        console.log(msg)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/dialog.less";
.wallet-wrap {
  width: 560px;
  .account-show {
    margin: 35px 40px 0;
    background: #363636;
    border-radius: 4px;
    padding: 30px 23px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .account {
      font-size: 16px;
      font-family: DINPro;
      font-weight: bold;
      color: #f0b90b;
    }
    .connect-tips {
      margin-top: 12px;
      font-size: 14px;
      font-family: DINPro;
      font-weight: 500;
      color: #999999;
    }
  }
  .card-wrap {
    margin: 22px 40px 0;
    display: flex;
    .card-item {
      margin-left: 10px;
      width: 113px;
      height: 52px;
      background: #3e3e3e;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      & > img {
        width: 20px;
        height: 20px;
      }
      span {
        display: flex;
        align-items: center;
        margin-left: 9px;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
      }
    }
    .card-item:hover {
      opacity: 0.8;
    }
  }
}
</style>