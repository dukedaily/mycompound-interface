<template>
  <div class="dialog-container"
       @click.stop="handleMaskClick">
    <div class="dialog-wrap"
         @click.stop="">
      <DialogHead :titleName="titleName"
                  :ifShowRight="ifShowRight" />
      <ReceiveCoin title="Remove" />
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
import waves from '@/directive/waves'
import DialogHead from 'comp/DialogComp/DialogHead.vue'
import DialogClose from 'comp/DialogComp/DialogClose.vue'
import BottomCard from 'comp/DialogComp/BottomCard.vue'
import ReceiveCoin from 'comp/DialogComp/ReceiveCoin.vue'
export default {
  directives: { waves },
  components: {
    DialogHead,
    DialogClose,
    BottomCard,
    ReceiveCoin
  },
  data () {
    return {
      titleName: 'Remove',
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
          name: 'Receive',
          isPair: false,
          coinName: '0.00 WBTC'
        }
      ]
    }
  },
  methods: {
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