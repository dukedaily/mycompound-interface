<template>
  <div class="dialog-container">
    <div class="dialog-wrap">
      <DialogHead :titleName="titleName"
                  :ifShowRight="ifShowRight"
                  :marginImg="getMarginCoinAddress"
                  :swapImg="getSwapCoinAddress"
                  :marginName="getMarginCoinName"
                  :swapName="getSwapCoinName" />
      <AmountShow :titleName="amountShowTitle" />
      <BalanceSelect :coinBalance="coinBalance"
                     :price="price"
                     :decimals="decimals" />
      <BottomCard :hasMask="hasMask"
                  :cardLists="cardLists" />
      <div class="btn-wrap">
        <CustomButton type="primary"
                      title="Repay"
                      class="btn"
                      @click="handleRepayClick" />
      </div>
      <DialogClose />
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import DialogHead from 'comp/DialogComp/DialogHead.vue'
import DialogClose from 'comp/DialogComp/DialogClose.vue'
import AmountShow from 'comp/DialogComp/AmountShow.vue'
import BalanceSelect from 'comp/DialogComp/BalanceSelect.vue'
import BottomCard from 'comp/DialogComp/BottomCard.vue'
import { mapState } from 'vuex'
import { ABI_UNI, ABI_BUSD, ABI_PRICE } from 'abi'
import { ethers } from 'ethers'
import types from 'types'
export default {
  directives: { waves },
  components: {
    DialogHead,
    DialogClose,
    AmountShow,
    BalanceSelect,
    BottomCard
  },
  data () {
    return {
      titleName: 'Repay',
      amountShowTitle: 'Debt APR & Amount',
      hasMask: true,
      ifShowRight: true,
      btnText: 'Repay',
      coinBalance: '--',
      cardLists: [
        {
          name: 'APR',
          isPair: true,
          pairFront: '0.00%',
          pairAfter: '1792.23%'
        },
        {
          name: 'Debt Ratio',
          isPair: true,
          pairFront: '0.00%',
          pairAfter: '69.23%'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      marginSwapLists: state => state.swap.marginSwapLists,
      marginSwapIndex: state => state.swap.marginSwapIndex,
      tokenAddress: state => state.swap.tokenAddress,
      account: state => state.account,
      price: state => state.price,
      pTokenAddress: state => state.swap.pTokenAddress,
      decimals: state => state.swap.decimals
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
    /**
     * 获取对应 token 的 abi 文件
     */
    getTokenAbi () {
      switch (this.tokenAddress.toLowerCase()) {
        case "0x075a36ba8846c6b6f53644fdd3bf17e5151789dc":
          return ABI_UNI
        case "0x4c6e1efc12fdfd568186b7baec0a43fffb4bcccf":
          return ABI_BUSD
        default:
          return ABI_UNI
      }
    },
  },
  watch: {
    tokenAddress: {
      handler () {
        this.getCoinBalance()
      },
      deep: true
    }
  },
  mounted () {
    this.getCoinBalance()
    this.getSwapUSDTprice()
  },
  methods: {
    /**
     * Supply点击
     */
    handleRepayClick () {
      alert('Repay')
    },
    /**
     * 获取资产币种余额
     */
    getCoinBalance () {
      this.$read(this.tokenAddress, ABI_UNI, 'balanceOf', this.account).then(res => {
        if (res) {
          this.coinBalance = ethers.utils.formatUnits(res, 18)
        }
      })
    },
    /**
     * 获取折u价格
     */
    getSwapUSDTprice () {
      this.$read(process.env.VUE_APP_SWAPUSDT_PRICE_ADDRESS, ABI_PRICE, "getUnderlyingPrice", this.pTokenAddress).then(res => {
        this.$store.commit(types.COIN_PRICE, res / 10 ** 18)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/dialog.less";
@import "../../assets/style/common.less";
.btn-wrap {
  .row-vertical-center();
  width: 100%;
  margin-top: 30px;
  padding: 0 40px;
  .btn {
    width: 100%;
  }
}
</style>