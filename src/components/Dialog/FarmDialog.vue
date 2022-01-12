<template>
  <div class="dialog-container">
    <div class="dialog-wrap">
      <DialogHead :titleName="titleName" />
      <div class="box">
        <BalanceSelect :ifNotShowSelect="ifNotShowSelect" />
        <BalanceSelect :ifNotShowSelect="ifNotShowSelect"
                       :ifNotShowTitle="ifNotShowTitle" />
        <DialogSlide />
        <Borrowing :ifShowImg="haveImg"
                   :titleLeft="borrowingTitle"
                   :token="tokenTop"
                   :tokenRight="borrowTokenRight" />
        <Borrowing :ifShowImg="NotImg"
                   :token="tokenBottom"
                   :titleLeft="convertedTitle"
                   :tokenRight="convertedTokenRight" />
        <PoolBottomCard :hasMask="hasMask"
                        :cardLists="cardLists" />
        <div class="btn-wrap">
          <CustomButton type="primary"
                        :title="stepValueFarm"
                        class="btn" />
        </div>
      </div>
      <DialogClose />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DialogHead from 'comp/DialogComp/DialogHead.vue'
import BalanceSelect from 'comp/DialogComp/BalanceSelect.vue'
import DialogSlide from 'comp/DialogComp/LeverSlide.vue'
import DialogClose from 'comp/DialogComp/DialogClose.vue'
import Borrowing from 'comp/DialogComp/Borrowing.vue'
import PoolBottomCard from 'comp/DialogComp/PoolBottomCard.vue'
export default {
  components: {
    DialogHead,
    BalanceSelect,
    DialogSlide,
    DialogClose,
    Borrowing,
    PoolBottomCard
  },
  data () {
    return {
      titleName: 'Supply',
      ifNotShowSelect: true,
      ifNotShowTitle: true,
      hasMask: true,
      pool: true,
      NotImg: false,
      haveImg: true,
      convertedTitle: 'Converted to LP Token',
      borrowingTitle: 'Borrowing Token APY  & Amount',
      tokenTop: 'USDT',
      tokenBottom: 'Estimate',
      borrowTokenRight: '0 USDC',
      convertedTokenRight: '≈ 0 WETH + 0USDC',
      cardLists: [
        {
          name: 'APR',
          pairAfter: '69.23%',
          imgShow: false,
        },
        {
          name: 'Debt',
          pairAfter: '0.00 USDC',
          imgShow: false,
        },
        {
          name: 'Debt Ratio',
          pairAfter: '0.00%',
          imgShow: true,
          sigleRed: require('img/sigle-red.png'),
        }
      ]
    }
  },
  computed: {
    ...mapState({
      stepValue: state => state.swap.swapLeverageSlideValue,
      stepValueFarm: state => `Farm ${state.swap.swapLeverageSlideValue}x`,
    })
  },
}
</script>

<style lang="less" scoped>
@import "../../assets/style/dialog.less";
/deep/.select {
  height: 70px !important;
}
/deep/.balance {
  margin-top: 25px !important;
}
.btn-wrap {
  margin-top: 20px;
  padding: 0 40px;
}
.box {
  height: 400px;
  overflow-y: scroll;
}
// ::-webkit-scrollbar {
//   -webkit-appearance: none;
//   width: 7px;
// }
// ::-webkit-scrollbar-thumb {
//   border-radius: 4px;
//   // background-color: rgba(0, 0, 0, 0.5);
//   background: linear-gradient(0deg, #f2d154, #e8ba41);
//   box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
// }
</style>