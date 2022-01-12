<template>
  <div class="deposits">
    <p class="title">Your deposits</p>
    <transition name="el-fade-in-linear">
      <div class="list-wrap"
           v-if="depositsLists.length !== 0">
        <div class="list-title">
          <div class="item"
               v-for="(item, index) in titleLists"
               :key="index"
               :style="{width: index === 0 ? '303px' : index === 1 ? '271px' : '586px'}">{{item.title}}</div>
        </div>
        <ul>
          <li v-for="(item, index) in depositsLists"
              :key="index">
            <div class="token">
              <img :src="item.coinImg"
                   alt="">
              <span>{{item.coinName}}</span>
            </div>
            <div class="asset">
              <el-tooltip class="item"
                          effect="dark"
                          placement="top">
                <div slot="content"
                     class="tooltip">
                  <span>{{item.assetAmount}}</span>
                </div>
                <span>{{formatnumberFn(item.assetAmount, 2)}}<span style="margin-left: 4px;">{{item.coinName}}</span></span>
              </el-tooltip>
              <div class="bottom">
                <span>$</span>
                <span>{{formatnumberFn(item.assetCount, 2)}}</span>
              </div>
            </div>
            <div class="earn">
              <el-tooltip class="item"
                          effect="dark"
                          placement="top">
                <div slot="content"
                     class="tooltip">
                  <span>{{item.earnAmount}}</span>
                </div>
                <span>{{formatnumberFn(item.earnAmount, 2)}}<span style="margin-left: 4px;">{{item.coinName}}</span></span>
              </el-tooltip>
              <div class="bottom">
                <span>$</span>
                <span>{{formatnumberFn(item.earnCount, 2)}}</span>
              </div>
            </div>
            <div class="btn-wrap">
              <CustomButton type="primary"
                            title="Supply"
                            class="btn supply"
                            @click="handleSupplyClick(index)" />
              <CustomButton type="primary"
                            title="Withdraw"
                            class="btn withdraw"
                            @click="handleWithdrawClick(index)" />
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="el-fade-in-linear">
      <div class="no-data"
           v-if="depositsLists.length === 0">
        <img :src="depositsBlankImg"
             alt="">
        <span>Earn risk-free yields</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { dialogType } from 'utils/enum.js'
// import { request, gql } from 'graphql-request'
import { getCoinImg, formatnumber, scientificNotationToString } from 'utils/index.js'
import { mapState, mapActions } from 'vuex'
import abiPrice from 'abi/price.json'
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
          title: 'Earned'
        },
      ],
      depositsLists: [], // 我的存款列表
      depositsBlankImg: require('img/blank_deposits.png')
    }
  },
  mounted () {
    this.queryList()
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  watch: {
    account: {
      handler () {
        this.queryList()
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(['getAssetsLists']),
    /**
     * 强制截取两位小数
     */
    formatnumberFn (num, count) {
      return formatnumber(num, count)
    },
    /**
     * supply点击
     */
    handleSupplyClick (index) {
      this.$store.commit(types.INPUT_VALUE, '') // 重置输入框
      this.$store.commit(types.ASSETS_ITEM_INDEX, index)
      this.$store.commit(types.DIALOG_TYPE, dialogType.DEPOSITS_SUPPLY)
    },
    /**
     * withdraw点击
     */
    handleWithdrawClick (index) {
      this.$store.commit(types.INPUT_VALUE, '') // 重置输入框
      this.$store.commit(types.ASSETS_ITEM_INDEX, index)
      this.$store.commit(types.DIALOG_TYPE, dialogType.DEPOSITS_WITHDRAW)
    },
    /**
     * 获取列表数据
     */
    async queryList () {
      const res = await this.getAssetsLists(this.account)
      let receiveLists = []
      receiveLists = res.accountPTokens
      this.$store.commit(types.ASSETS_LISTS, receiveLists)
      if (Array.isArray(receiveLists)) {
        for (let i = 0; i < receiveLists.length; i++) {
          await this.getSwapUSDTprice(receiveLists[i])
        }
      }
      this.depositsLists.sort((a, b) => {
        return b.assetCount - a.assetCount
      })
    },
    /**
     * 获取折u价格
     */
    async getSwapUSDTprice (item) {
      let priceAddress = process.env.VUE_APP_SWAPUSDT_PRICE_ADDRESS
      await this.$read(priceAddress, abiPrice, "getUnderlyingPrice", item.market.id).then(res => {
        let price = res / 10 ** 18
        this.depositsLists.push({
          coinImg: getCoinImg(item.market.underlyingAddress),
          coinName: item.market.underlyingSymbol,
          assetAmount: scientificNotationToString(parseFloat(item.pTokenBalance) * parseFloat(item.market.exchangeRate)),
          assetCount: parseFloat(item.pTokenBalance) * parseFloat(item.market.exchangeRate) * price,
          earnAmount: scientificNotationToString(parseFloat(item.pTokenBalance) * parseFloat(item.market.exchangeRate) - parseFloat(item.totalUnderlyingSupplied) + parseFloat(item.totalUnderlyingRedeemed)),
          earnCount: (parseFloat(item.pTokenBalance) * parseFloat(item.market.exchangeRate) - parseFloat(item.totalUnderlyingSupplied) + parseFloat(item.totalUnderlyingRedeemed)) * price
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.deposits {
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
          width: 263px;
          display: flex;
          align-items: center;
          img {
            width: 36px;
            height: 36px;
          }
          span {
            margin-left: 10px;
            font-size: 14px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .asset {
          width: 271px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          & > span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
          .bottom {
            margin-top: 10px;
            font-size: 14px;
            font-family: DINPro;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.4;
          }
        }
        .earn {
          width: 234px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          & > span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
          .bottom {
            margin-top: 10px;
            font-size: 14px;
            font-family: DINPro;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.4;
          }
        }
        .btn-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .btn {
            width: 150px;
            height: 34px;
          }
          .withdraw {
            margin-left: 20px;
            /deep/ .el-button {
              background: radial-gradient(circle, #36d0ac, #4fc6aa) !important;
              box-shadow: 0px 0px 6px 0px #3ed2b0 inset,
                0px 2px 13px 0px #77e3ca inset;
            }
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