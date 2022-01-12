<template>
  <div class="swap-lists">
    <p class="title">Margin Swap</p>
    <div class="list-wrap"
         v-if="poolLists.length !== 0">
      <div class="list-title">
        <div class="item"
             v-for="(item, index) in titleLists"
             :key="index"
             :style="{width: index === 0 ? '203px' : index === 1 ? '182px' : index === 2 ? '194px' : index === 3 ? '149px' : '442px'}">{{item.title}}</div>
      </div>
      <ul>
        <li v-for="(item, index) in poolLists"
            :key="index">
          <div class="token">
            <img class="coin-img"
                 :src="getImg(item.marginAddress)"
                 alt="">
            <img class="icon-right"
                 :src="rightImg"
                 alt="">
            <div class="swap-token">
              <img class="coin-img"
                   :src="getImg(item.swapAddress)"
                   alt="">
              <img class="supply-sign"
                   :src="supplySign"
                   v-if="item.isAutoSupply"
                   alt="">
            </div>
          </div>
          <div class="asset">
            <span class="top">{{formatnumberFn(item.marginAmount, 2)}}</span>
            <div class="bottom">
              <span style="margin-right: 2px">$</span>
              <el-tooltip class="item"
                          effect="dark"
                          placement="top">
                <div slot="content"
                     class="tooltip">
                  <span>{{item.marginAmount}}</span>
                </div>
                <span>{{formatnumberFn(item.marginAmount, 2)}}</span>
              </el-tooltip>
            </div>
          </div>
          <div class="debt">
            <span class="top">{{formatnumberFn(item.borrowingAmount, 2)}}</span>
            <div class="bottom">
              <span style="margin-right: 2px">$</span>
              <el-tooltip class="item"
                          effect="dark"
                          placement="top">
                <div slot="content"
                     class="tooltip">
                  <span>{{item.borrowingAmount}}</span>
                </div>
                <span>{{formatnumberFn(item.borrowingAmount, 2)}}</span>
              </el-tooltip>
            </div>
          </div>
          <div class="risk">
            <img :src="getRiskImg(item.risk)"
                 alt="">
            <span>{{item.risk}}%</span>
          </div>
          <div class="supply">
            <el-switch v-model="item.isAutoSupply"
                       active-color="#F4C51D"
                       inactive-color="#9C9B9B"
                       disabled
                       @click.native="handleSwitchClick(index)"></el-switch>
          </div>
          <div class="btn-wrap">
            <CustomButton type="border"
                          title="Add"
                          class="btn add"
                          @click="handleSwapAddClick(item)" />
            <CustomButton type="plain"
                          title="Repay"
                          class="btn repay"
                          @click="handleSwapRepayDialogShow(index)" />
            <CustomButton type="border"
                          title="Close"
                          class="btn close"
                          @click="handleSwapCloseDialogShow" />
          </div>
        </li>
      </ul>
    </div>
    <div class="no-data"
         v-if="poolLists.length === 0">
      <img :src="swapBlankImg"
           alt="">
      <span>Expand your fortune horizon</span>
    </div>
  </div>
</template>

<script>
import { dialogType } from 'utils/enum.js'
import { getCoinImg, formatnumber } from 'utils/index.js'
import { swapLists } from 'mock/swapLists.js'
import types from 'types'
export default {
  data () {
    return {
      titleLists: [
        {
          title: 'Token'
        },
        {
          title: 'Asset'
        },
        {
          title: 'Debt'
        },
        {
          title: 'Risk'
        },
        {
          title: 'Supply'
        }
      ],
      rightImg: require('img/icon-right.png'),
      swapBlankImg: require('img/blank_swap.png'),
      poolLists: [],
      sigleGreenImg: require('img/sigle-green.png'),
      sigleYellowImg: require('img/sigle-yellow.png'),
      sigleRedImg: require('img/sigle-red.png'),
      supplySign: require('img/supply-sign.png')
    }
  },
  mounted () {
    this.getPoolLists()
  },
  methods: {
    /**
     * 强制截取两位小数
     */
    formatnumberFn (num, count) {
      return formatnumber(num, count)
    },
    /**
     * 获取杠杆交易持仓列表
     */
    getPoolLists () {
      if (Array.isArray(swapLists)) {
        setTimeout(() => {
          this.poolLists = swapLists
          this.$store.commit(types.SWAP_LISTS, swapLists)
        }, 2000)
      }
    },
    /**
     * 获取币种图标
     */
    getImg (coinAddress) {
      return getCoinImg(coinAddress)
    },
    /**
     * 获取风险率图标
     */
    getRiskImg (risk) {
      if (risk < 60) {
        return this.sigleGreenImg
      } else if (risk >= 60 && risk < 75) {
        return this.sigleYellowImg
      } else {
        return this.sigleRedImg
      }
    },
    /**
     * SwapRepayDialog 显示
     */
    handleSwapRepayDialogShow (idx) {
      this.$store.commit(types.SWAP_INDEX, idx)
      this.$store.commit(types.DIALOG_TYPE, dialogType.SWAP_REPAY)
    },
    /**
     * SwapCloseDialog 显示
     */
    handleSwapCloseDialogShow () {
      this.$store.commit(types.DIALOG_TYPE, dialogType.SWAP_CLOSE)
    },
    /**
     * 点击 Add
     */
    handleSwapAddClick (item) {
      this.$router.push(`/market/swap?from=${item.marginAddress}&to=${item.swapAddress}`)
    },
    /**
     * Switch change
     */
    handleSwitchClick (idx) {
      this.$store.commit(types.SWAP_INDEX, idx)
      this.$store.commit(types.DIALOG_TYPE, dialogType.SWAP_SUPPLY)
    },
  }
}
</script>

<style lang="less" scoped>
.swap-lists {
  width: 1200px;
  min-height: 200px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  .title {
    font-size: 20px;
    font-family: DINPro;
    font-weight: bold;
    color: #f8d12f;
  }
  .list-wrap {
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    background-image: url("../../assets/images/list-bg.png");
    background-repeat: repeat;
    background-size: 100%;
    box-shadow: 0px 1px 12px 0px #130f08 inset,
      0px 1px 32px 0px rgba(117, 105, 105, 0.3) inset;
    border-radius: 12px;
    padding-bottom: 41px;
    .list-title {
      display: flex;
      height: 70px;
      align-items: center;
      .item {
        font-size: 16px;
        font-family: DINPro;
        font-weight: 400;
        color: #ffffff;
      }
      .item:first-child {
        padding-left: 40px;
      }
    }
    ul {
      display: flex;
      flex-direction: column;
      li {
        display: flex;
        align-items: center;
        height: 70px;
        padding: 0 31px 0 40px;
        border-bottom: 1px solid #282828;
        .token {
          width: 163px;
          display: flex;
          align-items: center;
          .coin-img {
            width: 36px;
            height: 36px;
          }
          .swap-token {
            width: 36px;
            height: 36px;
            position: relative;
            .coin-img {
              width: 36px;
              height: 36px;
            }
            .supply-sign {
              width: 16px;
              height: 16px;
              position: absolute;
              right: 0;
              bottom: 0;
              z-index: 1;
            }
          }
          .icon-right {
            margin-left: 3px;
            margin-right: 3px;
            width: 16px;
            height: 11px;
          }
        }
        .asset,
        .debt {
          width: 182px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .top {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
          .bottom {
            margin-top: 11px;
            font-size: 14px;
            font-family: DINPro;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.4;
          }
        }
        .debt {
          width: 194px;
        }
        .risk {
          width: 149px;
          position: relative;
          span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
          & > img {
            width: 11px;
            height: 13px;
            position: absolute;
            left: -2px;
            top: 50%;
            transform: translate(-100%, -50%);
          }
        }
        .supply {
          width: 140px;
          /deep/.el-switch__core {
            width: 51px !important;
            height: 12px !important;
          }
          /deep/.el-switch__core:after {
            width: 20px;
            height: 20px;
            left: 0px;
            top: 50%;
            transform: translateY(-50%);
          }
          /deep/.el-switch.is-checked .el-switch__core::after {
            left: calc(100% + 1px);
          }
          /deep/.el-switch.is-disabled {
            opacity: 1;
            .el-switch__core {
              cursor: pointer;
            }
          }
        }
        .btn-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .btn {
            width: 90px;
            height: 34px;
          }
          .repay,
          .close {
            margin-left: 15px;
          }
        }
      }
    }
  }
  .no-data {
    margin-top: 26px;
    width: 100%;
    height: 335px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: url("../../assets/images/list-bg.png");
    background-repeat: repeat;
    background-size: 100%;
    box-shadow: 0px 1px 12px 0px #130f08 inset,
      0px 1px 32px 0px rgba(117, 105, 105, 0.3) inset;
    border-radius: 12px;
    font-size: 14px;
    font-family: DINPro;
    font-weight: 500;
    color: #ffffff;
    border: none;
    & > img {
      width: 231px;
      height: 117px;
    }
    & > span {
      margin-top: 22px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.4);
      line-height: 40px;
    }
  }
}
</style>