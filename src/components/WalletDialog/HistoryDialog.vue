<template>
  <div class="wallet-container">
    <div class="wallet-wrap">
      <div class="head-wrap">
        <div class="head-title">
          <span>Transaction History</span>
          <img :src="closeImg"
               @click="handleCloseClick"
               alt="">
        </div>
        <div class="head-tab">
          <div class="tab-item"
               v-for="(item, index) in tabLists"
               :key="index"
               :class="item.isActive ? 'tab-item-active' : ''"
               @click="handleTabItemClick(index)">
            {{item.name}}
          </div>
        </div>
      </div>
      <HistoryLists />
    </div>
  </div>
</template>

<script>
import HistoryLists from 'comp/WalletDialog/HistoryLists.vue'
import { walletDialogType } from 'utils/enum.js'
import types from 'types'
export default {
  components: {
    HistoryLists
  },
  data () {
    return {
      closeImg: require('img/close.png'),
      tabLists: [
        {
          name: 'Market',
          isActive: true
        },
        {
          name: 'Swaps',
          isActive: false
        },
        {
          name: 'Pools',
          isActive: false
        },
        {
          name: 'Liquidation',
          isActive: false
        },
      ]
    }
  },
  methods: {
    /**
     * 弹窗关闭
     */
    handleCloseClick () {
      this.$store.commit(types.WALLET_DIALOG_TYPE, '')
      this.$store.commit(types.WALLET_DIALOG_TYPE, walletDialogType.WALLET_ACCOUNT)
    },
    /**
     * tab 点击
     */
    handleTabItemClick (index) {
      this.resetTabSelect()
      this.tabLists[index].isActive = true
    },
    /**
     * 重置 tab 选择
     */
    resetTabSelect () {
      this.tabLists.forEach(item => {
        item.isActive = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/dialog.less";
.wallet-wrap {
  width: 700px;
  padding: 65px 40px 43px;
  .head-wrap {
    display: flex;
    flex-direction: column;
    .head-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: 20px;
        font-family: DINPro;
        font-weight: 500;
        color: #fefefe;
      }
      img {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
    .head-tab {
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tab-item {
        width: 140px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(52, 52, 55, 0.4);
        border-radius: 4px;
        font-size: 16px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        line-height: 2px;
        cursor: pointer;
      }
      .tab-item-active {
        background: #f0b90b;
      }
    }
  }
}
</style>