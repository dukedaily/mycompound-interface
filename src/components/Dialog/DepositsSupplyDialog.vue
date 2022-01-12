<template>
  <div class="dialog-container">
    <div class="dialog-wrap">
      <DialogHead :titleName="titleName"
                  :ifShowRight="ifShowRight"
                  :isSingle="isSingle"
                  :iconImg="getImg"
                  :coinName="getCoinName" />
      <BalanceSelect :ifNotShowTitle="ifNotShowTitle"
                     :ifNotShowSelect="ifNotShowSelect"
                     :coinImg="getImg"
                     :coinName="getCoinName"
                     :coinBalance="coinBalance"
                     :price="price"
                     :decimals="decimals" />
      <BottomCard :hasMask="hasMask"
                  :cardLists="cardLists" />
      <div class="btn-wrap">
        <CustomButton type="primary"
                      :title="btnText"
                      class="btn"
                      :disabled="disabled"
                      :loading="isLoadingShow"
                      @click="handleClick" />
      </div>
      <DialogClose />
    </div>
  </div>
</template>

<script>
import DialogHead from 'comp/DialogComp/DialogHead.vue'
import BalanceSelect from 'comp/DialogComp/BalanceSelect.vue'
import BottomCard from 'comp/DialogComp/BottomCard.vue'
import DialogClose from 'comp/DialogComp/DialogClose.vue'
import { mapState } from 'vuex'
import { getCoinImg } from 'utils/index.js'
import abiUNI from 'abi/abiUNI.json'
import abiBUSD from 'abi/abiBUSD.json'
import abiPUNI from 'abi/abiPUNI.json'
import abiPBUSD from 'abi/abiPBUSD.json'
import abiPrice from 'abi/price.json'
import { ethers } from 'ethers'
import types from 'types'
export default {
  components: {
    DialogHead,
    BalanceSelect,
    BottomCard,
    DialogClose,

  },
  data () {
    return {
      titleName: 'Supply',
      ifShowRight: false,
      isSingle: true,
      ifNotShowTitle: true,
      ifNotShowSelect: true,
      hasMask: false,
      coinBalance: '--',
      isAllowance: false,
      isLoadingShow: false, // 是否显示加载动画
      allowanceNum: 0, // 授权金额
      btnText: 'Enter an amount'
    }
  },
  mounted () {
    this.allowanceUser()
    this.getCoinBalance()
    this.getSwapUSDTprice()
  },
  computed: {
    ...mapState({
      account: state => state.account, // 钱包地址
      depositsItemIndex: state => state.assets.depositsItemIndex, // 点击到market角标
      depositsLists: state => state.assets.depositsLists, // market 数据列表
      inputValue: state => state.inputValue,
      price: state => state.price // 币种价格
    }),
    cardLists () {
      let lists = [
        {
          name: 'APY',
          isPair: false,
          isToolTipSingle: true,
          supplyRate: this.depositsLists[this.depositsItemIndex].market.supplyRate,
          distributionSupplyRate: this.depositsLists[this.depositsItemIndex].market.distributionSupplyRate
        }
      ]
      return lists
    },
    /**
     * 获取币种图标
     */
    getImg () {
      let coinAddress = this.depositsLists[this.depositsItemIndex].market.underlyingAddress
      return getCoinImg(coinAddress)
    },
    /**
     * 获取币种名称
     */
    getCoinName () {
      return this.depositsLists[this.depositsItemIndex].market.underlyingSymbol
    },
    /**
     * 获取对应 token 的 abi 文件
     */
    getTokenAbi () {
      switch ((this.depositsLists[this.depositsItemIndex].market.underlyingAddress).toLowerCase()) {
        case "0x075a36ba8846c6b6f53644fdd3bf17e5151789dc":
          return abiUNI
        case "0x4c6e1efc12fdfd568186b7baec0a43fffb4bcccf":
          return abiBUSD
        default:
          return abiUNI
      }
    },
    /**
     * 获取对应 pToken 的 abi 文件
     */
    getPTokenAbi () {
      switch ((this.depositsLists[this.depositsItemIndex].market.id).toLowerCase()) {
        case "0x28153df80ea23839f8f89019dd17ea25950662e2":
          return abiPUNI
        case "0xe16abfeba9ce1d3ffc3647985f3ca464b4a0e42b":
          return abiPBUSD
        default:
          return abiPUNI
      }
    },
    /**
     * 判断按钮是否可点击
     */
    disabled () {
      return this.btnText === 'Enter an amount' || this.btnText.indexOf('Insufficient') != -1 || this.btnText === 'Exceed decimals'
    },
    /**
     * 获取精度
     */
    decimals () {
      return this.depositsLists[this.depositsItemIndex].market.underlyingDecimals.toString()
    },
    /**
     * 判断输入是否超过精度限制
     */
    isLimitInput () {
      let isLimit = false
      if (typeof this.inputValue === 'string') {
        if (this.inputValue.indexOf('.') != -1) {
          let s = this.inputValue.split('.')[1]
          isLimit = s.length > this.decimals
        } else {
          isLimit = false
        }
      }
      return isLimit
    }
  },
  watch: {
    /**
     * 监听输入值变化，改变按钮文案
     */
    inputValue: {
      handler () {
        if (this.inputValue * 10 ** this.decimals > this.allowanceNum) {
          this.btnText = 'Approve'
          this.isAllowance = false
        } else if (parseFloat(this.inputValue) > parseFloat(this.coinBalance)) {
          this.btnText = `Insufficient ${this.getCoinName} Balance`
        } else if (this.inputValue == '') {
          this.btnText = 'Enter an amount'
        } else if (this.isLimitInput) {
          this.btnText = 'Exceed decimals'
        } else {
          this.btnText = 'Supply'
        }
      },
      deep: true
    }
  },
  methods: {
    /**
     * 获取折u价格
     */
    getSwapUSDTprice () {
      let priceAddress = process.env.VUE_APP_SWAPUSDT_PRICE_ADDRESS
      let pTokenContractAddress = this.depositsLists[this.depositsItemIndex].market.id
      this.$read(priceAddress, abiPrice, "getUnderlyingPrice", pTokenContractAddress).then(res => {
        this.$store.commit(types.COIN_PRICE, res / 10 ** 18)
      })
    },
    /**
     * 查看当前用户是否授权
     */
    allowanceUser () {
      let contractAddress = this.depositsLists[this.depositsItemIndex].market.underlyingAddress
      let pTokenContractAddress = this.depositsLists[this.depositsItemIndex].market.id
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        contractAddress,
        this.getTokenAbi,
        provider
      );
      contract.allowance(
        this.account,
        pTokenContractAddress
      ).then((allowance) => {
        if (allowance) {
          this.allowanceNum = allowance.toString()
          if (allowance.toString() > 0) {
            this.isAllowance = true
          } else {
            this.isAllowance = false
          }
        }
      });
    },
    /**
     * 弹窗按钮点击
     */
    handleClick () {
      if (this.isAllowance) { // 去存款
        this.handleSupply()
      } else { // 去授权
        this.approveRequest()
      }
    },
    /**
     * 存款
     */
    handleSupply () {
      this.isLoadingShow = true
      let pTokenContractAddress = this.depositsLists[this.depositsItemIndex].market.id
      let price = ethers.utils.parseUnits(this.inputValue, this.decimals)
      this.$writeLoad(pTokenContractAddress, this.getPTokenAbi, 'mint', price).then(res => {
        if (res) {
          this.isLoadingShow = false
          this.$message({ message: '存款成功', type: 'success' })
          this.$store.commit(types.DIALOG_TYPE, '')
          window.location.reload()
        }
      }).catch(err => {
        this.isLoadingShow = false
        this.$message({ message: err, type: 'error' })
        console.log(err)
      })
    },
    /**
     * 授权
     */
    approveRequest () {
      this.isLoadingShow = true
      let contractAddress = this.depositsLists[this.depositsItemIndex].market.underlyingAddress
      let pTokenContractAddress = this.depositsLists[this.depositsItemIndex].market.id
      // let approveNumStr = scientificNotationToString(1e50)
      const BigNumbers = ethers.utils.parseUnits("10000000000", this.decimals)
      this.$writeLoad(contractAddress, this.getTokenAbi, 'approve', pTokenContractAddress, BigNumbers).then(res => {
        if (res) {
          this.isLoadingShow = false
          this.inputValue = ''
          this.btnText = 'Enter an amount'
          this.$message({ message: '授权成功', type: 'success' })
        }
      }).catch(err => {
        this.isLoadingShow = false
        console.log(err)
      })
    },
    /**
     * 获取资产币种余额
     */
    getCoinBalance () {
      let contractAddress = this.depositsLists[this.depositsItemIndex].market.underlyingAddress
      this.$read(contractAddress, this.getTokenAbi, 'balanceOf', this.account).then(res => {
        this.coinBalance = ethers.utils.formatUnits(res, 18)
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
  padding: 0 40px;
  margin-top: 30px;
  .btn {
    width: 100%;
  }
}
</style>