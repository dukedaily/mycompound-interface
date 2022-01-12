<template>
  <div class="content">
    <div class="content-top">
      <div class="market-size">
        <div class="market-size-div">
          Market Size
        </div>
      </div>
      <div class="market-num">
        <template v-if="listType">
          <span class="num-font-color">$</span>
          <countTo :startVal="startVal"
                   :endVal='totalVal'
                   :decimals="2"
                   :duration='500'></countTo>
        </template>
        <span v-else>
          --
        </span>
      </div>
    </div>
    <div class="content-center">
      Market
    </div>
    <div class="content-bottom"
         v-for="(item, index) in dataList"
         :key="index">
      <div class="bottom-head">
        <div class="list-left">
          <img class="coin-img"
               :src="getCoinImg(item.underlyingAddress)"
               alt="">
          <span>{{item.underlyingSymbol}}</span>
        </div>
        <div class="list-right">
          <CustomButton type="primary"
                        title="Supply"
                        @click="handleSupplyClick(index)"
                        class="reset-btn" />
        </div>
      </div>
      <div class="bottom-list">
        <div class="ul">
          <div class="total-borrow li">
            <div class="li-top">Total Supply</div>
            <div class="li-bottom">
              ${{item.totalSupplyMoney}}
            </div>
          </div>
          <div class="total-borrow li">
            <div class="li-top">Total Borrow</div>
            <div class="li-bottom">
              ${{item.totalBorrowsMoney}}
            </div>
          </div>
          <div class="supply-apr li">
            <div class="li-top">Supply APR</div>
            <div class="li-bottom">
              <el-tooltip effect="dark"
                          :content="item.supplyRatesSix + '% ' + ' + ' +item.distributionSupplyRateSix + '%'"
                          placement="bottom">
                <span class="border-style">{{item.supplyApy}}%</span>
              </el-tooltip>
            </div>
          </div>
          <div class="supply-apy li">
            <div class="li-top">Borrow APY</div>
            <div class="li-bottom">
              <el-tooltip effect="dark"
                          :content="item.borrowRatesSix + '% ' + ' + ' +item.distributionBorrowRateSix + '%'"
                          placement="bottom">
                <span class="border-style">{{item.borrowApy}}%</span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <SupplyDialog v-if="dialogType === 3" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SupplyDialog from 'comp/Dialog/SupplyDialog.vue'
import { dialogType } from 'utils/enum.js'
import types from 'types'
import countTo from 'vue-count-to';
import { getCoinImg, formatnumber } from 'utils/index.js'
export default {
  components: {
    countTo,
    SupplyDialog
  },
  props: {
    recordLists: {
      type: Array
    },
    totalVal: {
      type: Number
    }
  },
  data () {
    return {
      marketLeft: require('img/marketLeft.png'),
      marketRight: require('img/marketRight.png'),
      projectSide: require('img/projectSide.png'),
      startVal: 0,
      listType: false,
      dataList: [],
      liList: [
        { name: 'Total Supply' },
        { name: 'Total Borrow' },
        { name: 'Supply APR' },
        { name: 'Borrow APY' }
      ],
      slippageIndex: 0,
      slippageItem: 0,
    }
  },
  computed: {
    ...mapState({
      dialogType: state => state.dialogType
    }),
  },
  watch: {
    recordLists: {
      handler () {
        this.dataList = this.recordLists;
        this.listType = true;
      },
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  methods: {
    handlesLippageClick (index, item) {
      this.slippageIndex = index;
      this.slippageItem = item;
    },
    /**
     * Supply 点击
     */
    handleSupplyClick (index) {
      this.$store.commit(types.INPUT_VALUE, '') // 重置输入框
      this.$store.commit(types.MARKET_ITEM_INDEX, index)
      this.$store.commit(types.DIALOG_TYPE, dialogType.MARKET_SUPPLY)
    },
    /**
     * 获取服务器图片地址
     */
    getCoinImg (url) {
      return getCoinImg(url);
    },
    /**
     * 强制截取两位小数
     */
    formatnumberFn (num, count) {
      return formatnumber(num, count)
    },
  }
}
</script>

<style scoped lang="less">
.content {
  margin: 30px 15px 0 15px;
  .content-top {
    width: 100%;
    height: 140px;
    border-radius: 8px;
    background-image: url("../../assets/images/marketBannerH5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 30px;
    .market-size {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 10px;
      padding-top: 40px;
      margin-bottom: 15px;
      .market-size-div {
        width: 158px;
        height: 10px;
        background-image: url("../../assets/images/marketSizeH5.png");
        background-repeat: no-repeat;
        background-size: 100% 7px;
        background-position: center;
        text-align: center;
        line-height: 10px;
        font-size: 12px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
    }
    .market-num {
      text-align: center;
      span {
        font-family: bold;
        height: 35px;
        line-height: 35px;
        font-size: 35px;
        color: #ffffff;
        // -webkit-text-stroke: 1px #ff9b01;
        background: linear-gradient(90deg, #ebe5d4 0%, #f8d12f 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .num-font-color {
        background: linear-gradient(90deg, #ebe5d4 0%, #ebe5d4 100%);
        // text-shadow: 0px 6px 10px #070707;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .content-center {
    margin-top: 10px;
    height: 52px;
    background: #111111;
    font-size: 20px;
    font-family: DINPro;
    font-weight: bold;
    color: #f8d12f;
    line-height: 52px;
  }
  .content-bottom {
    margin-bottom: 15px;
    width: 100%;
    height: 145px;
    background-image: url("../../assets/images/marketCardH5.png");
    background-repeat: repeat;
    background-size: 100%;
    border-radius: 12px;
    .bottom-head {
      height: 67px;
      width: 100%;
      border-bottom: 1px solid #424242ff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .list-left {
        margin-left: 10px;
        height: 30px;
        display: flex;
        align-items: center;
        img {
          width: 18px;
          height: 18px;
          margin-right: 10px;
        }
        span {
          font-size: 14px;
          font-family: DINPro;
          font-weight: 500;
          color: #ffffff;
          line-height: 18px;
        }
      }
      .list-right {
        margin-right: 18px;
        .reset-btn {
          width: 90px;
          height: 30px;
        }
      }
    }
    .bottom-list {
      margin-top: 15px;
      width: 100%;
      .ul {
        display: flex;
        justify-content: space-between;
        .li {
          height: 37px;
          font-size: 14px;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
          .border-style {
            border-bottom: 1px dashed #ffffff;
          }
        }
        .li-top {
          font-size: 10px;
          font-family: DINPro;
          font-weight: 400;
          color: #ffffff;
          line-height: 10px;
          opacity: 0.6;
          margin-bottom: 14px;
          display: flex;
          flex-direction: column;
        }
        .li-bottom {
          text-align: center;
        }
        .li:first-child {
          margin-left: 10px;
        }
        .li:last-child {
          margin-right: 18px;
        }
      }
    }
  }
}
button {
  border: none;
  width: 90px;
  height: 30px;
  background: linear-gradient(90deg, #dba909, #f8d12f, #dba909, #dba909);
  box-shadow: 0px 0px 6px 0px #ffe375, 0px 1px 7px 0px #fff0b7;
  border-radius: 8px;
  font-size: 14px;
  font-family: DINPro;
  font-weight: bold;
  color: #1a1818;
}
button:hover {
  cursor: pointer;
}
.hoverText {
  cursor: pointer;
}
</style>