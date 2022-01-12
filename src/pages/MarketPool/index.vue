
<template>
  <div class="box">
    <MarketPoolCard />
    <MarketPoolList :marketLists="marketLists" />
    <FarmDialog v-if="dialogType === 9" />
  </div>
</template>

<script>
import MarketPoolList from 'comp/Lists/MarketPoolList.vue'
import MarketPoolCard from 'comp/Card/MarketPoolCard.vue'
import FarmDialog from 'comp/Dialog/FarmDialog.vue'
import { mapState } from 'vuex'
export default {
  components: {
    MarketPoolCard,
    MarketPoolList,
    FarmDialog
  },
  computed: {
    ...mapState({
      dialogType: state => state.dialogType
    })
  },
  data () {
    return {
      marketLists: [
        {
          usdcImg: require('img/usdc.png'),
          tokenASymbol: 'WETH',
          tokenBSymbol: 'USDT',
          tvl: '$234,234,636.23',//总锁定价值 
          yieldFarmIncomeRate: '',//流动性挖矿收益率（复利）
          borrowInterestRate: 0.3,//借款年化利率
          miningIncomeRate: 0.5,//平台挖矿收益率
          leverageStep: 1,//杠杆倍数递增步数
          leverageMax: 3,//最大杠杆倍数
          miningIncomeRateLeverage: 52, //项目方挖矿APR+（杠杆倍数-1）*项目方挖矿APR*（1-平台抽成）
          borrowInterestRateLeverage: 52,//杠杆倍数-1）*借款利息
          platformLoanRewards: 52,//平台币借款奖励APR
          totalApr: 80,//总APR
        },

      ]
    }
  },
  watch: {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.box {
  background: #111111;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
