
<template>
  <div class="box">
    <MarketH5 v-if="isMobile"
              :recordLists="recordLists"
              :totalVal="totalVal" />
    <MarketPc v-else
              :recordLists="recordLists"
              :totalVal="totalVal" />
  </div>
</template>

<script>
import MarketPc from '../MarketView/MarketPc'
import MarketH5 from '../MarketView/MarketH5'
import { mapState } from 'vuex'
import { getCoinImg, formatnumber, formatSizeKmb } from 'utils/index.js'
import { request, gql } from 'graphql-request'
import abiPrice from 'abi/price.json'
import { ethers } from 'ethers'
import types from 'types'
export default {
  components: {
    MarketPc,
    MarketH5
  },
  data () {
    return {
      dataLength: false,
      recordLists: [
      ],
      startVal: 0,
      totalVal: 0,
      timeOff: false,
      timedTasksCollector: null,
    }
  },
  computed: {
    ...mapState({
      dialogType: state => state.dialogType,
      isMobile: state => state.isMobile
    })
  },
  methods: {
    /**
     * 获取折u价格
     */
    async getSwapUSDTprice (item) {
      let price;
      let priceAddress = process.env.VUE_APP_SWAPUSDT_PRICE_ADDRESS
      let pTokenContractAddress = item
      await this.$read(priceAddress, abiPrice, "getUnderlyingPrice", pTokenContractAddress).then(res => {
        price = ethers.utils.formatUnits(res, 18);
      })
      console.log('获取折优价格====》', price)
      return price;
    },


    /**
     * 获取列表数据
     */
    queryList () {
      const endpoint = process.env.VUE_APP_MARKET_LIST_URL
      const query = gql`{      
          markets(first: 8) {
            id
            name
            symbol
            decimals
            underlyingAddress
            underlyingName
            underlyingSymbol
            underlyingDecimals
            totalSupply
            totalBorrows
            cash
            reserves
            exchangeRate
            supplyRate
            borrowRate
            distributionSupplyRate
            distributionBorrowRate
            decimals
          }
      }`
      request(endpoint, query).then(async (res) => {
        console.log(res)
        let totalAdd = 0;
        let arr = [];
        if (res.markets.length != 0) {
          if (this.timeOff === false) {
            for (let key in res.markets) {
              let item = res.markets[key];
              let price = await this.getSwapUSDTprice(item.id)
              item.totalSupplyMoney = this.twoNumber(item.totalSupply * item.exchangeRate * price);
              item.totalSupplyMoneySort = item.totalSupply * item.exchangeRate * price;
              let supplyNum = item.totalSupply * item.exchangeRate * price;
              item.totalSupplyTool = `$${this.formatnumberFn(Number(supplyNum), 6).toString()}`;
              item.totalSupplyBottomTool = `${Number(item.totalSupply * item.exchangeRate)} ${item.underlyingSymbol}`;
              item.totalSupplyToken = this.twoNumber(item.totalSupply * item.exchangeRate);
              item.totalBorrowsMoney = this.twoNumber(item.totalBorrows * price);
              let borrowsNum = item.totalBorrows * price;
              item.totalBorrowsTool = `$${this.formatnumberFn(Number(borrowsNum), 6).toString()}`;
              item.totalBorrowsBottomTool = `${Number(item.totalBorrows)} ${item.underlyingSymbol}`;
              item.totalBorrowsToken = this.twoNumber(item.totalBorrows);
              item.tokenImg = getCoinImg(item.id);
              item.supplyRates = this.formatnumberFn(item.supplyRate, 2);
              item.supplyRatesSix = this.formatnumberFn(item.supplyRate, 6);
              item.distributionSupplyRates = this.formatnumberFn(item.distributionSupplyRate, 2);
              item.borrowRates = this.formatnumberFn(item.borrowRate, 2);
              item.borrowRatesSix = this.formatnumberFn(item.borrowRate, 6);
              item.distributionBorrowRates = this.formatnumberFn(item.distributionBorrowRate, 2);
              item.distributionSupplyRateSix = this.formatnumberFn(item.distributionSupplyRate, 6);
              item.distributionBorrowRateSix = this.formatnumberFn(item.distributionBorrowRate, 6);
              item.supplyApy = this.formatnumberFn((Number(item.supplyRate) + Number(item.distributionSupplyRate)), 2);
              item.borrowApy = this.formatnumberFn((Number(item.borrowRate) - Number(item.distributionBorrowRate)), 2);
              item.supplyApySix = this.formatnumberFn((Number(item.supplyRate) + Number(item.distributionSupplyRate)), 6);
              item.borrowApySix = this.formatnumberFn((Number(item.borrowRate) - Number(item.distributionBorrowRate)), 6);
              totalAdd += Number(item.totalSupply * item.exchangeRate * price);
              arr.push(item);
            }
            this.totalVal = totalAdd;
            this.recordLists = arr.sort((a, b) => { return b.totalSupplyMoneySort - a.totalSupplyMoneySort });
            this.timeOff = true;
          } else {
            for (let key in res.markets) {
              let item = res.markets[key];
              let price = await this.getSwapUSDTprice(item.id)
              totalAdd += Number(item.totalSupply * item.exchangeRate * price);
            }
            this.totalVal = totalAdd;
          }
          this.dataLength = true;
          this.$store.commit(types.MARKET_LISTS, this.recordLists)
        }
      }).catch((err) => {
        console.log(err)
      })

    },

    /**
     * 截取后转换K、M、B
     */
    twoNumber (val) {
      let twoFirstNum = this.formatnumberFn(Number(val), 2);
      let kmb = this.formatSize(twoFirstNum);
      let len = kmb.length;
      let lastKmd = kmb.substring(len - 1, len);
      let firstNum = kmb.substr(0, len - 1);
      return firstNum + lastKmd;
    },
    // /**
    //  * 截取掉小数点后6位
    //  */
    // sixNum (num) {
    //   let nums = num.toString();
    //   return nums.substring(0, nums.indexOf(".") + 7);
    // },
    /**
     * 转换K.M.B单位
     */
    formatSize (num) {
      return formatSizeKmb(num)
    },
    /**
     * 强制截取两位小数
     */
    formatnumberFn (num, count) {
      return formatnumber(num, count)
    },
    /**
     * 获取服务器图片地址
     */
    getCoinImg (url) {
      return getCoinImg(url);
    },
    /**
    * 定时器
    */
    timer () {
      clearInterval(this.timedTasksCollector);
      this.timedTasksCollector = setInterval(() => {
        this.queryList()
      }, 5000);
    }
  },
  /**
    * 路由后清除定时器
    */
  beforeRouteLeave (to, from, next) {
    next();
    if (this.timedTasksCollector) {
      clearInterval(this.timedTasksCollector);
      this.timedTasksCollector = null;
    }
  },
  mounted () {
    this.queryList();
    this.timer();
  },
}
</script>
<style lang="less" scoped>
@import "../../assets/style/transition.less";
.box {
  background: #111111;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
}
</style>
