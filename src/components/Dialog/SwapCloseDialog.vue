<template>
  <div class="dialog-container"
       @click.stop="handleMaskClick">
    <div class="dialog-wrap"
         @click.stop="">
      <DialogHead :titleName="titleName"
                  :ifShowRight="ifShowRight" />
      <AmountShow :titleName="amountShowTitle" />
      <ReceiveCoin />
      <BottomCard :hasMask="hasMask"
                  :cardLists="cardLists" />
      <div class="btn-wrap">
        <CustomButton type="primary"
                      title="Withdraw"
                      class="btn"
                      @click="handleWithdrawClick" />
      </div>
      <DialogClose />
    </div>
  </div>
</template>

<script>
import DialogHead from 'comp/DialogComp/DialogHead.vue'
import AmountShow from 'comp/DialogComp/AmountShow.vue'
import DialogClose from 'comp/DialogComp/DialogClose.vue'
import BottomCard from 'comp/DialogComp/BottomCard.vue'
import ReceiveCoin from 'comp/DialogComp/ReceiveCoin.vue'
import { mapState } from 'vuex'
import { getCoinImg } from 'utils/index.js'
export default {
  components: {
    DialogHead,
    AmountShow,
    DialogClose,
    BottomCard,
    ReceiveCoin
  },
  data () {
    return {
      titleName: 'Close',
      amountShowTitle: 'Asset',
      hasMask: false,
      ifShowRight: true,
      btnText: 'Withdraw',
      cardLists: [
        {
          name: 'Debt',
          isPair: true,
          pairFront: '10.23 WETH',
          pairAfter: '10 ETH'
        },
        {
          name: 'Debt Ratio',
          isPair: true,
          pairFront: '0.00%',
          pairAfter: '69.23%'
        },
        {
          name: ' Estimate Receive',
          isPair: false,
          coinName: '0.00 WBTC'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      marginSwapLists: state => state.swap.marginSwapLists,
      marginSwapIndex: state => state.swap.marginSwapIndex
    }),
    /**
     * 获取抵押币种地址
     */
    getMarginCoinAddress () {
      return this.marginSwapLists[this.marginSwapIndex].marginAddress
    },
    /**
     * 获取借贷币种地址
     */
    getSwapCoinAddress () {
      return this.marginSwapLists[this.marginSwapIndex].swapAddress
    },
    /**
     * 获取抵押币种名称
     */
    getMarginCoinName () {
      return this.marginSwapLists[this.marginSwapIndex].marginToken
    },
    /**
     * 获取借贷币种名称
     */
    getSwapCoinName () {
      return this.marginSwapLists[this.marginSwapIndex].swapToken
    },
  },
  methods: {
    /**
     * 获取币种图标
     */
    getImg (address) {
      return getCoinImg(address)
    },
    /**
     * 遮罩点击弹窗消失
     */
    handleMaskClick () {
      // this.$emit('closeDismiss')
    },
    /**
     * Withdraw点击
     */
    handleWithdrawClick () {
      alert('Withdraw')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/dialog.less";
@import "../../assets/style/common.less";
.btn-wrap {
  width: 100%;
  .row-center();
  padding: 0 40px;
  .btn {
    width: 100%;
  }
}
</style>