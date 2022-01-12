<template>
  <div class="balance-select">
    <div class="balance"
         :class="!ifNotShowTitle ? '' : 'balance-no-left'">
      <div v-show="!ifNotShowTitle"
           class="balance-left">
        <span>Repay</span>
        <div class="line"></div>
      </div>
      <div class="balance-right">
        <span>{{type === 'withdraw' ? 'Available:' : 'Balance:' }}</span>
        <span>{{balance}}</span>
        <span style="margin-left: 4px">{{coinName}}</span>
        <div class="max"
             :class="isMax ? 'max-active' : ''"
             @click="handleMaxClick">MAX</div>
      </div>
    </div>
    <div class="select">
      <div class="left"
           @click="handleSelectClick">
        <img v-if="coinName"
             class="logo"
             :src="coinImg"
             alt="">
        <img v-else
             class="logo"
             :src="getImg(tokenAddress)" />
        <span v-if="coinName">{{coinName}}</span>
        <span v-else>{{tokenName}}</span>
        <i v-if="!ifNotShowSelect"
           :class="isSelected ? 'up' : ''"></i>
        <el-collapse-transition>
          <CoinSelect @close="handleSelectClose"
                      v-if="isSelected" />
        </el-collapse-transition>
      </div>
      <div class="mid1"></div>
      <div class="mid2"></div>
      <div class="right">
        <div class="top">
          <input :placeholder="0"
                 v-model="inputValue"
                 oninput="value=value.replace(/[^\d^\.]+/g,'')"
                 type="tel" />
        </div>
        <div class="bottom">
          <span>≈ $</span>
          <span style="margin-left: 4px"> {{inputPrice}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoinSelect from 'comp/Select/CoinSelect.vue'
import { scientificNotationToString, formatnumber, getCoinImg } from 'utils/index.js'
import { mapState } from 'vuex'
import types from 'types'
export default {
  components: {
    CoinSelect
  },
  props: {
    ifNotShowTitle: {
      type: Boolean,
      require: false,
      default: false
    },
    ifNotShowSelect: {
      type: Boolean,
      require: false,
      default: false
    },
    coinImg: {
      type: String,
      require: false
    },
    coinName: {
      type: String,
      require: false
    },
    coinBalance: {
      type: String,
      require: true,
      default: '--'
    },
    price: {
      type: Number,
      require: true
    },
    decimals: {
      type: String,
      require: true
    },
    type: {
      type: String,
      require: false
    }
  },
  data () {
    return {
      usdtImg: require('img/usdt.png'),
      isSelected: false
    }
  },
  computed: {
    ...mapState({
      tokenName: state => state.swap.tokenName,
      tokenAddress: state => state.swap.tokenAddress
    }),
    /**
     * 输入框绑定值（vuex）
     */
    inputValue: {
      get () {
        return this.$store.state.inputValue
      },
      set (newVal) {
        this.$store.commit(types.INPUT_VALUE, newVal)
      }
    },
    /**
     * 输入的值是否为余额最大值
     */
    isMax () {
      return parseFloat(this.coinBalance) == parseFloat(this.inputValue)
    },
    /**
     * 余额显示处理
     */
    balance () { // 默认显示 --
      if (isNaN(this.coinBalance)) {
        return '--'
      } else {
        return formatnumber(this.coinBalance, 4)
      }
    },
    /**
     * 输入值折U计算
     */
    inputPrice () {
      return formatnumber(this.scientificNotationToStringFn(this.inputValue * this.price), 2)
    }
  },
  methods: {
    /**
     * 关闭币种选择弹窗
     */
    handleSelectClose () {
      this.isSelected = false
    },
    /**
     * 获取币种图标 
     */
    getImg (tokenName) {
      return getCoinImg(tokenName)
    },
    /**
     * 科学计数法转换为字符串
     */
    scientificNotationToStringFn (num) {
      return scientificNotationToString(num)
    },
    /**
     * 币种选择
     */
    handleSelectClick () {
      this.isSelected = !this.isSelected
    },
    /**
     * Max点击
     */
    handleMaxClick () {
      this.inputValue = formatnumber(this.coinBalance, parseFloat(this.decimals))
    }
  }
}
</script>

<style lang="less" scoped>
.balance-select {
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  .balance {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .balance-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      & > span {
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        opacity: 0.6;
      }
      .line {
        margin-top: 6px;
        width: 40px;
        height: 1px;
        border-bottom: 1px dashed rgba(240, 185, 11, 0.3);
      }
    }
    .balance-right {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        line-height: 2px;
        opacity: 0.4;
      }
      .max {
        width: 50px;
        height: 22px;
        margin-left: 6px;
        background: #3c3521;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #f0b90b;
        cursor: pointer;
        opacity: 0.4;
      }
      .max-active {
        opacity: 1;
      }
    }
  }
  .balance-no-left {
    justify-content: flex-end;
  }
  .select {
    margin-top: 24px;
    width: 100%;
    height: 98px;
    display: flex;
    align-items: center;
    background: #282b2f;
    border-radius: 8px;
    border: 1px solid transparent;
    .left {
      position: relative;
      width: 151px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      background-color: #393333;
      padding-left: 20px;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      & > img {
        width: 36px;
        height: 36px;
      }
      & > span {
        margin-left: 7px;
        font-size: 18px;
        font-family: DINPro;
        font-weight: bold;
        color: #ffffff;
      }
      & > i {
        width: 18px;
        height: 10px;
        margin-left: 6px;
        background: url("../../assets/images/arrow-down.png") no-repeat;
        background-size: 100%;
        transition: 0.2s;
      }
      .up {
        transform: rotate(180deg);
      }
    }
    .mid1 {
      width: 8px;
      height: 100%;
      background: rgba(74, 69, 69, 0.4);
      border: none;
    }
    .mid2 {
      width: 8px;
      height: 100%;
      background: rgba(74, 69, 69, 0.8);
      border: none;
    }
    .right {
      width: calc(100% - 167px);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-right: 16px;
      background-color: #4a4545;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      .top {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        & > img {
          width: 19px;
          height: 19px;
        }
        & > span {
          margin-left: 8px;
          font-size: 18px;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
        }
        input {
          width: 200px;
          height: 20px;
          font-size: 16px;
          font-family: DINPro-Medium, DINPro;
          color: #ffffff;
          background-color: #4a4545;
          font-weight: 500;
          line-height: 21px;
          text-align: right;
        }
        .from-input {
          background-image: url("../../assets/images/reverage.png");
          background-repeat: no-repeat;
          background-position: center;
          background-position-x: 10px;
          padding-left: 26px;
        }
        input::-webkit-input-placeholder {
          font-size: 16px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          line-height: 21px;
        }
        input::-moz-placeholder {
          font-size: 16px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          line-height: 21px;
        }
        input:-ms-input-placeholder {
          font-size: 16px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          line-height: 21px;
        }
      }
      .bottom {
        margin-top: 6px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          font-size: 14px;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
          opacity: 0.4;
        }
      }
    }
  }
  .select:hover {
    border: 1px solid #e8ba41;
  }
}
</style>