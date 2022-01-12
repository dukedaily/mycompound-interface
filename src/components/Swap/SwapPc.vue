<template>
  <div class="swap-container">
    <div class="balance">
      <span>Balance:</span>
      <span class="count">{{formData.balance}}</span>
      <span class="ceim">{{formData.token}}</span>
      <div class="max"
           :class="isMax ? 'max-active' : ''"
           @click="handleMaxClick">MAX</div>
    </div>
    <div class="wrap">
      <div class="sign">From</div>
      <div class="left"
           @click="handleFromClick">
        <img class="logo"
             :src="formData.tokenImg"
             alt="">
        <span>{{formData.token}}</span>
        <i :class="isFromSelect ? 'up' : ''"></i>
        <CustomSelect v-if="isFromSelect" />
      </div>
      <div class="right">
        <img :src="reverageImg"
             alt=""
             class="reverageImg">
        <div class="top">
          <el-tooltip effect="dark"
                      :content="'Balance '+balanceNum + ' + Leverage ' + leverageNum"
                      placement="bottom-end">
            <input v-model="formData.inputValue"
                   oninput="value=value.replace(/[^\d^\.]+/g,'')"
                   placeholder="0"
                   type="tel"
                   class="from-input" />
          </el-tooltip>
        </div>
        <div class="bottom">
          <span>≈ $</span>
          <span> {{this.formData.discount}}</span>
        </div>
      </div>
    </div>
    <div class="space">
      <img :src="swapImg"
           @click="handleSwapClick"
           alt="">
    </div>
    <div class="wrap"
         style="margin-top: 0;">
      <div class="sign">To</div>
      <div class="left"
           @click="handleToClick">
        <img class="logo"
             :src="toData.tokenImg"
             alt="">
        <span>{{toData.token}}</span>
        <i :class="isToSelect ? 'up' : ''"></i>
        <CustomSelect v-if="isToSelect" />
      </div>
      <div class="right">
        <div class="top">
          <input v-model="toData.inputValue"
                 oninput="value=value.replace(/[^\d^\.]+/g,'')"
                 placeholder="0"
                 type="tel" />
        </div>
        <div class="bottom">
          <span>≈ $</span>
          <span> {{this.toData.discount}}</span>
        </div>
      </div>
    </div>
    <CustomButton @click="morePosition"
                  type="primary"
                  :title="btnText"
                  class="btn"
                  :disabled="disabled"
                  :loading="isLoadingShow" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CustomSelect from 'comp/Select/CustomSelect.vue'
import { getCoinImg } from 'utils/index.js'
import abiUNI from 'abi/abiUNI.json'
import abiBUSD from 'abi/abiBUSD.json'
import { ethers } from 'ethers'
import abiPrice from 'abi/price.json'
import abiMorePostion from 'abi/abiMOREPOSITION.json'
import { scientificNotationToString, formatnumber } from 'utils/index.js'

export default {
  components: {
    CustomSelect
  },
  data () {
    return {
      swapImg: require('img/swap-down.png'),
      usdcImg: require('img/usdc.png'),
      uniImg: require('img/uni.png'),
      reverageImg: require('img/reverage.png'),
      isFromSelect: false,
      isToSelect: false,
      price: 0,
      balanceNum: 0,
      leverageNum: 0,
      formData: {
        tokenImg: require('img/uni.png'),
        token: 'BUSD',
        inputValue: '',
        discount: '0.00',
        address: '0x4c6e1efc12fdfd568186b7baec0a43fffb4bcccf',
        balance: '--',
        id: '0xe16abfeba9ce1d3ffc3647985f3ca464b4a0e42b',
        pToken: '0xcc94bb3617800ea842d177d3737d6cfc5af9d5ab',
        priceNum: '',
      },
      toData: {
        tokenImg: require('img/usdc.png'),
        token: 'UNI',
        inputValue: '',
        discount: '0.00',
        address: '0x075a36ba8846c6b6f53644fdd3bf17e5151789dc',
        balance: '--',
        id: '0x28153df80ea23839f8f89019dd17ea25950662e2',
        pToken: '0xd9c8287f5cee429078a3cfa340885c282b842865',
        priceNum: '',
      },
      exchangeData: {},
      btnText: 'Enter an amount',
      isLoadingShow: false, // 是否显示加载动画
      isAllowance: false,
      disabledFlag: true,
      allowanceNum: 0, // 授权金额
      inputOFF: true,
    }
  },
  methods: {
    /**
     * 加仓
     */
    morePosition () {
      if (this.isAllowance) {
        this.isLoadingShow = true
        //杠杆交易合约地址
        let morePositonAddress = process.env.VUE_APP_MARGINSWAP_MOREPOSITION
        //保证金金额
        let supplyAmount = ethers.utils.parseUnits(this.formData.inputValue.toString(), 18);
        let leverage = ethers.utils.parseUnits('2', 18);
        let swapToken = this.toData.address;
        let slippageTolerance = ethers.utils.parseUnits('1', 18);
        this.$writeLoad(morePositonAddress, abiMorePostion, "openPosition", supplyAmount, leverage, swapToken, slippageTolerance).then(res => {
          console.log(res);
          this.isLoadingShow = false
          this.$message({ message: '交易成功', type: 'success' })
        }).catch(err => {
          this.$message({ message: err, type: 'error' })
          this.isLoadingShow = false
          console.log(err)
        })
      } else { // 去授权
        this.approveRequest();
      }
    },

    /**
     * 查看当前用户是否授权
     */
    allowanceUser () {
      let contractAddress = this.formData.address;
      let morePositonAddress = process.env.VUE_APP_MARGINSWAP_MOREPOSITION;
      this.$read(contractAddress, this.getTokenAbi(), 'allowance', this.account, morePositonAddress).then(allowance => {
        if (allowance) {
          this.allowanceNum = allowance.toString();
          console.log(allowance.toString())
          if (allowance.toString() > 0) {
            this.isAllowance = true;
          } else {
            this.isAllowance = false;
          }
          this.inputFun();//执行按钮状态
        }

      })
    },
    /**
     * 授权
     */
    approveRequest () {
      this.isLoadingShow = true;
      let contractAddress = this.formData.address;
      let morePositonAddress = process.env.VUE_APP_MARGINSWAP_MOREPOSITION;
      // let approveNumStr = this.scientificNotationToStringFn(1e50)
      const BigNumbers = ethers.utils.parseUnits("10000000000", 18);
      this.$writeLoad(contractAddress, this.getTokenAbi(), 'approve', morePositonAddress, BigNumbers).then(res => {
        if (res) {
          this.isLoadingShow = false
          this.formData.inputValue = ''
          this.btnText = 'Enter an amount'
          this.$message({ message: '授权成功', type: 'success' })
          this.allowanceUser()
        }
      }).catch(err => {
        this.isLoadingShow = false
        console.log(err)
        this.allowanceUser()
      })
    },
    /**
     * 获取初始按钮文案
     */
    getInitBtnText () {
      if (!this.account) {
        this.btnText = 'Connect Wallet'
      }
    },


    /**
     * 获取资产币种余额
     */
    getCoinBalance () {
      let contractAddress = this.formData.address;
      this.$read(contractAddress, this.getTokenAbi(), 'balanceOf', this.account).then(res => {
        if (res) {
          let balances = ethers.utils.formatUnits(res, 18);
          if (isNaN(balances)) {
            this.formData.balance = '--';
          } else {
            this.formData.balance = formatnumber(balances, 4);
          }
        }
      })
    },
    /**
     * 获取对应 token 的 abi 文件
     */
    getTokenAbi () {
      switch (this.formData.address.toLowerCase()) {
        case "0x075a36ba8846c6b6f53644fdd3bf17e5151789dc":
          return abiUNI
        case "0x4c6e1efc12fdfd568186b7baec0a43fffb4bcccf":
          return abiBUSD
      }
    },
    /**
     * 获取折u价格
     */
    getSwapUSDTprice () {
      let priceAddress = process.env.VUE_APP_SWAPUSDT_PRICE_ADDRESS
      let formAddress = this.formData.pToken;
      let toAddress = this.toData.pToken;
      this.$read(priceAddress, abiPrice, "getUnderlyingPrice", formAddress).then(res => {
        this.formData.priceNum = res / 10 ** 18;
        console.log(this.formData.priceNum)
      })
      this.$read(priceAddress, abiPrice, "getUnderlyingPrice", toAddress).then(res => {
        this.toData.priceNum = res / 10 ** 18;
        console.log(this.toData.priceNum)
      })
    },
    /**
     * 输入值折U计算
     */
    inputPrice (input, values) {
      return formatnumber(this.scientificNotationToStringFn(Number(input) * Number(values)), 2)
    },
    /**
     * 科学计数法转换为字符串
     */
    scientificNotationToStringFn (num) {
      return scientificNotationToString(num)
    },
    /**
     * 点击From币种选择
     */
    handleFromClick () {
      this.isFromSelect = !this.isFromSelect
    },
    /**
     * 点击 To 币种选择
     */
    handleToClick () {
      this.isToSelect = !this.isToSelect
    },
    /**
     * 点击MAX
     */
    handleMaxClick () {
      this.formData.inputValue = formatnumber(this.formData.balance, 18)
    },
    /**
     * 点击swap图标交换
     */
    handleSwapClick () {
      this.btnText = 'In exchange...';
      this.inputOFF = false;
      this.balanceNum = 0;
      this.leverageNum = 0;
      this.exchangeData = this.toData;
      this.toData = this.formData;
      this.formData = this.exchangeData;
      this.getSwapUSDTprice();
      if (this.account) {//获取钱包地址后再请求
        this.getCoinBalance();
        this.getInitBtnText();
        this.allowanceUser();
      }

    },
    /**
     * 点击leverage swap
     */
    handleLeverageClick () {
      // alert('点击Leverage Swap')
    },
    /**
     * 按钮状态
     */
    inputFun () {
      if (this.account) {
        if (this.formData.inputValue * 10 ** 18 > this.allowanceNum) {
          this.btnText = 'Approve'
          this.isAllowance = false
        } else if (parseFloat(this.formData.inputValue) > parseFloat(this.formData.balance)) {
          this.btnText = `Insufficient ${this.formData.token} Balance`
        } else if (this.formData.inputValue == '') {
          this.btnText = 'Enter an amount'
        } else if (this.isLimitInput) {
          this.btnText = 'Exceed decimals'
        } else {
          this.btnText = 'Margin Swap'
        }
      } else {
        this.btnText = 'Connect Wallet'
      }
      this.inputOFF = true;
    },
  },
  watch: {
    /**
     * 监听vuex 拿到钱包地址后获取钱包余额
     */
    '$store.state.account': function (newVal) {
      if (newVal) {
        this.getCoinBalance();
        this.getInitBtnText();
        this.allowanceUser();
      }
    },
    /**
     * 监听输入值变化，改变按钮文案
     */
    'formData.inputValue': {
      handler () {
        this.formData.discount = this.inputPrice(this.formData.inputValue, this.formData.priceNum);
        if (this.inputOFF == true) {//交换后 不允许监听input
          this.inputFun();
          this.balanceNum = (1 / Number(this.stepValue)) * Number(this.formData.inputValue);
          this.leverageNum = (1 - 1 / Number(this.stepValue)) * Number(this.formData.inputValue);
        }
      },
      // deep: true
    },
    'toData.inputValue': {
      handler () {
        this.toData.discount = this.inputPrice(this.toData.inputValue, this.toData.priceNum);
      },
    }
  },
  computed: {
    ...mapState({
      account: state => state.account, // 钱包地址
      stepValue: state => state.swap.swapLeverageSlideValue//杠杆倍数
    }),
    /**
     * 输入的值是否为余额最大值
     */
    isMax () {
      return parseFloat(this.formData.balance) == parseFloat(this.formData.inputValue)
    },
    /**
     * 判断按钮是否可点击
     */
    disabled () {
      return this.btnText === 'Enter an amount' || this.btnText.indexOf('Insufficient') != -1 || this.btnText === 'Connect Wallet' || this.btnText === 'Exceed decimals' || this.btnText === 'In exchange...'
    },
    /**
     * 获取精度
     */
    decimals () {
      return this.marketLists[this.marketItemIndex].underlyingDecimals.toString()
    },
    /**
     * 获取币种图标
     */
    getImg (id) {
      return getCoinImg(id)
    },
    /**
     * 判断输入是否超过精度限制
     */
    isLimitInput () {
      let isLimit = false
      if (typeof this.formData.inputValue === 'string') {
        if (this.formData.inputValue.indexOf('.') != -1) {
          let s = this.formData.inputValue.split('.')[1]
          isLimit = s.length > 18
        } else {
          isLimit = false
        }
      }
      return isLimit
    }

  },
  mounted () {
    this.getSwapUSDTprice();
    if (this.account) {
      this.getCoinBalance();
      this.getInitBtnText();
      this.allowanceUser();
    }
  },
}
</script>

<style lang="less" scoped>
.swap-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  padding: 31px 59px 170px 39px;
  .balance {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      font-size: 14px;
      font-family: DINPro;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.4);
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
  .wrap {
    margin-top: 12px;
    width: 100%;
    height: 98px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    background: #282b2f;
    border-radius: 8px;
    padding: 0 55px 0 48px;
    border: 1px solid transparent;
    .sign {
      width: 42px;
      height: 20px;
      background: rgba(240, 185, 11, 0.4);
      border-top-left-radius: 8px;
      border-bottom-right-radius: 8px;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 105;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
    .left {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      & > img {
        width: 40px;
        height: 40px;
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
    .right {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      .reverageImg {
        position: absolute;
        top: 10px;
        right: -35px;
      }
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
          width: 220px;
          height: 20px;
          font-size: 16px;
          font-family: DINPro-Medium, DINPro;
          color: #ffffff;
          background-color: #282b2f;
          font-weight: 500;
          line-height: 21px;
          text-align: right;
        }
        // .from-input {
        //   background-image: url("../../assets/images/reverage.png");
        //   background-repeat: no-repeat;
        //   background-position: center;
        //   background-position-x: 10px;
        //   padding-left: 26px;
        // }
        input::-webkit-input-placeholder {
          font-size: 16px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: #ffffff;
          line-height: 21px;
        }
        input::-moz-placeholder {
          font-size: 16px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: #ffffff;
          line-height: 21px;
        }
        input:-ms-input-placeholder {
          font-size: 16px;
          font-family: DINPro-Medium, DINPro;
          font-weight: 500;
          color: #ffffff;
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
          color: rgba(255, 255, 255, 0.4);
        }
      }
    }
  }
  .wrap:hover {
    border: 1px solid #f0b90b;
  }
  .btn {
    margin-top: 50px;
    width: 480px;
    height: 50px;
  }
  .space {
    width: 100%;
    height: 30px;
    position: relative;
    img {
      width: 52px;
      height: 52px;
      position: absolute;
      left: 52px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 105;
      cursor: pointer;
    }
  }
}
</style>