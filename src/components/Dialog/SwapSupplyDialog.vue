<template>
  <div class="dialog-container">
    <div class="dialog-wrap">
      <DialogHead :titleName="titleName"
                  :marginImg="getMarginCoinAddress"
                  :swapImg="getSwapCoinAddress"
                  :marginName="getMarginCoinName"
                  :swapName="getSwapCoinName" />
      <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
        bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
        justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque
      </div>
      <div class="select">
        <div><i></i><span>the 5% deposit benefits of ETH</span></div>
        <div><i></i><span>Enjoy the 15% deposit unite reward</span></div>
        <div><i></i><span>When Eth fund usage reaches 100% may not be active,
            the probability is very small, but it may happen</span></div>
      </div>
      <div class="btn-wrap">
        <CustomButton type="border"
                      title="Withdraw"
                      class="with-btn"
                      @click="handleWithdrawClick" />
        <CustomButton type="primary"
                      title="Supply"
                      class="supply-btn"
                      @click="handleSupplyClick" />
      </div>
      <DialogClose />
    </div>
  </div>
</template>

<script>
import DialogHead from 'comp/DialogComp/DialogHead.vue'
import DialogClose from 'comp/DialogComp/DialogClose.vue'
import types from 'types'
import { mapState } from 'vuex'
export default {
  components: {
    DialogHead,
    DialogClose
  },
  data () {
    return {
      titleName: 'Margin Swap Supply'
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
    }
  },
  methods: {
    /**
     * Withdraw点击
     */
    handleWithdrawClick () {
      this.$store.commit(types.DIALOG_TYPE, '')
    },
    /**
     * Supply点击
     */
    handleSupplyClick () {
      this.marginSwapLists.map((item, index) => {
        if (this.marginSwapIndex == index) {
          item.isAutoSupply = !item.isAutoSupply
        }
      })
      setTimeout(() => {
        this.$store.commit(types.SWAP_LISTS, this.marginSwapLists)
        this.$store.commit(types.DIALOG_TYPE, '')
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/dialog.less";
@import "../../assets/style/common.less";
.content {
  padding: 0 40px;
  margin-top: 30px;
  font-size: 14px;
  font-family: DINPro;
  font-weight: 400;
  color: #ffffff;
  line-height: 26px;
  opacity: 0.6;
}
.select {
  width: 100%;
  padding: 0 40px;
  margin-top: 31px;
  background: rgba(49, 45, 45, 0.6);
  border: 1px solid #312d2d;
  border-radius: 6px;
  div {
    margin-top: 30px;
    display: flex;
    align-items: center;
    position: relative;
    i {
      position: absolute;
      width: 6px;
      height: 6px;
      left: 0;
      top: 11px;
      border-radius: 50%;
      background-color: #edc72c;
    }
    span {
      font-size: 14px;
      font-family: DINPro;
      font-weight: 400;
      color: #ffffff;
      opacity: 0.8;
      line-height: 26px;
      padding-left: 14px;
    }
  }
  div:first-child {
    margin-top: 0;
  }
}
.btn-wrap {
  .row-between();
  margin-top: 40px;
  width: 100%;
  padding: 0 40px;
  .with-btn,
  .supply-btn {
    width: 230px;
    height: 50px;
  }
}
</style>