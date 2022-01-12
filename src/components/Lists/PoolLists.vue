<template>
  <div class="pool-lists">
    <p class="title">Margin Pool</p>
    <transition name="el-fade-in-linear">
      <div class="list-wrap"
           v-if="poolLists.length !== 0">
        <div class="list-title">
          <div class="item"
               v-for="(item, index) in titleLists"
               :key="index"
               :style="{width: index === 0 ? '233px' : index === 1 || index === 3 ? '153px' : index === 2 ? '134px' : '506px'}">{{item.title}}</div>
        </div>
        <ul>
          <li v-for="(item, index) in poolLists"
              :key="index">
            <div class="token">
              <img :src="item.poolImg"
                   alt="">
              <div class="pair">
                <div class="pair-wrap">
                  <span>{{item.coinName1}}</span>
                  <span style="margin: 0 4px">/</span>
                  <span>{{item.coinName2}}</span>
                </div>
                <span class="apy">{{item.coinPercent}}%</span>
              </div>
            </div>
            <div class="asset">
              <el-tooltip effect="dark"
                          content="Estimate：1WETH+1USDT"
                          placement="top">
                <span style="margin-right: 2px">$</span>
                <span>{{item.assetCount}}</span>
              </el-tooltip>
            </div>
            <div class="debt">
              <span style="margin-right: 2px">$</span>
              <span>{{item.debtCount}}</span>
            </div>
            <div class="earn">
              <span>{{item.earnCount}}</span>
            </div>
            <div class="risk">
              <img :src="item.sigleImg"
                   alt="">
              <span>{{item.riskCount}}</span>
            </div>
            <div class="btn-wrap">
              <CustomButton type="border"
                            title="Add"
                            class="btn add"
                            @click="handleAddClick" />
              <CustomButton type="plain"
                            title="Repay"
                            class="btn repay"
                            @click="handleRepayClick" />
              <CustomButton type="border"
                            title="Remove"
                            class="btn remove"
                            @click="handleRemoveClick" />
              <CustomButton type="primary"
                            title="Harvest"
                            class="btn harvest"
                            @click="handleHarvestClick" />
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="no-data"
           v-if="poolLists.length === 0">
        <img :src="poolBlankImg"
             alt="">
        <span>Multiply your mining yields</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { dialogType } from 'utils/enum.js'
import types from 'types'
export default {
  data () {
    return {
      poolBlankImg: require('img/blank_pool.png'),
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
          title: 'Earned'
        },
        {
          title: 'Risk'
        },
      ],
      poolLists: []
      // poolLists: [
      //   {
      //     poolImg: require('img/usdc.png'),
      //     coinName1: 'WETH',
      //     coinName2: 'USDC',
      //     coinPercent: '636.23',
      //     assetCount: '100.23',
      //     debtCount: '60.22',
      //     earnCount: '60.3232',
      //     riskCount: '20.34',
      //     sigleImg: require('img/sigle-green.png')
      //   },
      //   {
      //     poolImg: require('img/usdc.png'),
      //     coinName1: 'WETH',
      //     coinName2: 'USDC',
      //     coinPercent: '636.23',
      //     assetCount: '100.23',
      //     debtCount: '60.22',
      //     earnCount: '60.3232',
      //     riskCount: '60.34',
      //     sigleImg: require('img/sigle-yellow.png')
      //   },
      //   {
      //     poolImg: require('img/usdc.png'),
      //     coinName1: 'WETH',
      //     coinName2: 'USDC',
      //     coinPercent: '636.23',
      //     assetCount: '100.23',
      //     debtCount: '60.22',
      //     earnCount: '60.3232',
      //     riskCount: '90.34',
      //     sigleImg: require('img/sigle-red.png')
      //   },
      // ],

    }
  },
  methods: {
    /**
     * add点击
     */
    handleAddClick () {
      this.$router.push('/market/pool')
    },
    /**
     * repay点击
     */
    handleRepayClick () {
      this.$store.commit(types.DIALOG_TYPE, dialogType.ASSET_POOL_REPAY)
    },
    /**
     * harvest点击
     */
    handleHarvestClick () {
      this.$store.commit(types.DIALOG_TYPE, dialogType.ASSET_POOL_HARVEST)
    },
    /**
     * remove点击
     */
    handleRemoveClick () {
      this.$store.commit(types.DIALOG_TYPE, dialogType.ASSET_POOL_REMOVE)
    }
  }
}
</script>

<style lang="less" scoped>
.pool-lists {
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
          width: 193px;
          display: flex;
          align-items: center;
          img {
            width: 36px;
            height: 36px;
          }
          .pair {
            margin-left: 8px;
            display: flex;
            flex-direction: column;
            .pair-wrap {
              display: flex;
              span {
                font-size: 14px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
              }
            }
            .apy {
              margin-top: 12px;
              font-size: 14px;
              font-family: DINPro;
              font-weight: 400;
              color: #ffffff;
              line-height: 2px;
              opacity: 0.4;
            }
          }
        }
        .asset,
        .earn {
          width: 153px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          & > span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .debt {
          width: 134px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          & > span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .risk {
          width: 92px;
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
          .remove,
          .harvest {
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