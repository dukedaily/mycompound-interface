<template>
  <div class="box">
    <el-collapse class="fold-collapse"
                 v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div>
            <p class="collapseLeft">
              <img class="dot"
                   :src="dotImg" />
              <i>Slippage Tolerance</i>
            </p>
            <p class="collapseRight">
              {{slippageTolerance}}%
            </p>
          </div>
        </template>
        <div class="slippage">
          <div class="slippage-top">
            <div class="slippage-top-box">
              <div class="slippage-top-left">
                <p :class="{active:slippageIndex === index}"
                   @click="handlesLippageClick(index,item.value)"
                   v-for="(item, index) in slippageList"
                   :key="index">{{item.value}}%
                </p>
              </div>
              <div class="slippage-top-right">
                <el-input v-model="slippageValue"
                          placeholder="Custom">
                </el-input>
              </div>
            </div>
          </div>
          <div v-if="!slippageShow"
               class="slippage_margin"></div>
          <div class="slippage-bottom"
               v-if="slippageShow">Slippage range should be 0.00%~ 50.00% </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <div>
            <p class="collapseLeft">
              <img class="dot"
                   :src="dotImg" />
              <i>Gas Price</i>
            </p>
            <p class="collapseRight">
              {{gasText}}（{{gasPrice}} GWEI）
            </p>
          </div>
        </template>
        <div class="gas">
          <div class="gas-top">
            <div class="gas-top-box">
              <div class="gas-top-left">
                <p :class="{active:gasIndex === index}"
                   @click="handleGasClick(index,item.value)"
                   v-for="(item, index) in gasList"
                   :key="index">{{item.value}}</p>
              </div>
              <div class="gas-top-right">
                <el-input v-model="gasValue"
                          placeholder="Custom">
                </el-input>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <div>
            <p class="collapseLeft">
              <img class="dot"
                   :src="dotImg" />
              <i>Exchanges</i>
            </p>
            <p class="collapseRight">
              25
            </p>
          </div>
        </template>
        <div class="exchanges">
          <div class="mingraator">
            <div class="mingraator-div">
              <img class="dot"
                   :src="dotImg" />
              <span>1linch Mingraator</span>
            </div>
            <div class="mingraator-div">
              <img class="dot"
                   :src="dotImg" />
              <span>1linch Mingraator</span>
            </div>
            <div class="mingraator-div">
              <img class="dot"
                   :src="dotImg" />
              <span>1linch Mingraator</span>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="button-box">
      <CustomButton type="border"
                    title="Reset"
                    class="reset-btn" />
      <CustomButton type="primary"
                    title="Close"
                    class="close-btn" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slippageList: [
        { 'value': 0.1 },
        { 'value': 0.5 },
        { 'value': 1 },
        { 'value': 3 },
      ],
      gasList: [
        { 'value': '41 Fast' },
        { 'value': '56 Very Fast' },
      ],
      slippageValue: '',
      gasValue: '',
      slippageIndex: 0,
      gasIndex: 0,
      dotImg: require('../../assets/images/dots.png'),
      activeNames: [],
      slippageTolerance: 0.1,
      gasPrice: 41,
      gasText: 'Fast',
      slippageShow: false,
    }
  },
  methods: {
    /**
     * 关闭按钮
     */
    handleCloseClick () {
      this.$emit('close')
    },
    handlesLippageClick (index, val) {
      this.slippageIndex = index;
      this.slippageTolerance = val;
    },
    handleGasClick (index) {
      this.gasIndex = index;
      if (index == 0) {
        this.gasPrice = 41;
      } else {
        this.gasPrice = 56;
      }

    },
    /**
     * 重置按钮
     */
    resetBtn () {

    },
    closeBtn () {

    }
  },
  watch: {
    slippageValue: function () {
      // 不能以小数点开始和只能输入一个小数点
      this.slippageValue = this.slippageValue.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^\./g, '')
      //只能输入两个小数
      this.slippageValue = (this.slippageValue.match(/\d+(\.\d{0,2})?/) || [''])[0]

      if (Number(this.slippageValue) > 50) {
        this.slippageShow = true;
      } else {
        this.slippageShow = false;
        switch (Number(this.slippageValue)) {
          case 0:
            this.slippageIndex = 0
            break;
          case 0.1:
            this.slippageIndex = 0
            break;
          case 0.5:
            this.slippageIndex = 1
            break;
          case 1:
            this.slippageIndex = 2
            break;
          case 3:
            this.slippageIndex = 3
            break;
          default:
            this.slippageIndex = -1
        }
        if (Number(this.slippageValue) == '') {
          this.slippageTolerance = 0.1;
        } else {
          this.slippageTolerance = this.slippageValue;
        }
      }

    },
    gasValue: function () {
      this.gasValue = this.gasValue.replace(/[^\d]/g, '');
      console.log(Number(this.gasValue))
      switch (Number(this.gasValue)) {
        case 0:
          this.gasIndex = 0
          break;
        case 41:
          this.gasIndex = 0
          break;
        case 56:
          this.gasIndex = 1
          break;
        default:
          this.gasIndex = -1
      }
      if (Number(this.gasValue) == '') {
        this.gasPrice = 41;
        this.gasText = 'Fast';
      } else {
        this.gasPrice = this.gasValue;
        this.gasText = 'Custom';
      }
    },
  }
}
</script>

<style lang='less' scoped>
.active {
  opacity: 1 !important;
}
.box {
  width: 100%;
  position: relative;
  background: transparent;
}
.fold-collapse {
  display: block;
  margin: 0 37px 30px 37px;
  border: none !important;
  .el-collapse-item:last-child {
    /deep/.el-collapse-item__header {
      border-bottom: 1px solid #333333;
    }
  }
  /deep/.el-collapse-item__header {
    height: 70px;
    color: #a6a6a6;
    background: transparent;
    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      p {
        font-size: 16px;
        font-family: DINPro;
        font-weight: 500;
        i {
          font-size: 16px;
          font-family: DINPro;
          font-weight: 500;
        }
      }
      .collapseLeft {
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
      .collapseRight {
        margin-right: 16px;
        color: #ffffff;
      }
    }
  }

  /deep/.el-collapse-item__wrap {
    background: #181a1e;
    border-bottom: 1px solid #333333;
    div {
      font-size: 16px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
      line-height: 2px;
    }
    div:last-child {
      margin-bottom: 0;
    }
    .el-collapse-item__content {
      padding-bottom: 0px;
    }
  }
  /deep/.el-collapse-item:last-child .el-collapse-item__wrap {
    border: none;
  }
  /deep/.el-collapse-item__arrow {
    margin: 0 0 0 auto;
  }
  /deep/.el-collapse-item__content {
    .slippage {
      width: 100%;
      .slippage-top {
        width: 100%;
        height: 42px;
        .slippage-top-box {
          width: 100%;
          height: 42px;
          display: flex;
          justify-content: space-between;
          .slippage-top-left {
            width: 447px;
            height: 42px;
            background: #141111;
            border: 1px solid #262626;
            border-radius: 6px;
            display: flex;
            align-items: center;

            p {
              font-size: 16px;
              font-family: DINPro;
              font-weight: 500;
              width: 115px;
              height: 36px;
              background: #2f2a2b;
              border-radius: 4px;
              text-align: center;
              line-height: 36px;
              color: #ffffff;
              opacity: 0.3;
            }
            p:first-child {
              margin-left: 2px;
            }
            p:last-child {
              margin-right: 2px;
            }
          }

          .slippage-top-right {
            width: 146px;
            height: 40px;
            background: #141111;

            border-radius: 6px;
            .el-input {
              margin: 0;
              width: 146px;
            }
            input {
              background: #141111;
              width: 100%;
              height: 42px;
              color: #ffffff !important;
              font-size: 16px;
              font-family: DINPro;
              font-weight: 500;
              line-height: 36px;
            }
            .el-input__inner {
              &::placeholder {
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
              &::-webkit-input-placeholder {
                /* Chrome/Opera/Safari */
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
              &:-moz-placeholder {
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
              &::-moz-placeholder {
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
              &:-ms-input-placeholder {
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
            }
          }
        }
      }
      .slippage_margin {
        width: 100%;
        height: 20px;
      }
      .slippage-bottom {
        width: 100%;
        height: 14px;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 400;
        color: #f0670b;
        text-align: right;
        margin: 10px 0 20px 0;
        line-height: 14px;
      }
    }
    .gas {
      width: 100%;
      .gas-top {
        width: 100%;
        height: 42px;
        margin-bottom: 20px;
        .gas-top-box {
          width: 100%;
          height: 42px;
          display: flex;
          justify-content: space-between;
          .gas-top-left {
            width: 457px;
            height: 42px;
            background: #141111;
            border: 1px solid #262626;
            border-radius: 6px;
            display: flex;
            align-items: center;
            p {
              font-size: 16px;
              font-family: DINPro;
              font-weight: 500;
              width: 50%;
              height: 36px;
              background: #2f2a2b;
              border-radius: 4px;
              text-align: center;
              line-height: 36px;
              color: #ffffff;
              opacity: 0.3;
            }
            p:first-child {
              margin-left: 2px;
            }
            p:last-child {
              margin-right: 2px;
            }
          }
          .gas-top-right {
            width: 146px;
            height: 42px;
            background: #141111;
            border-radius: 6px;
            .el-input {
              margin: 0;
              width: 146px;
            }
            input {
              background: #141111;
              width: 100%;
              height: 42px;
              color: #ffffff !important;
              font-size: 16px;
              font-family: DINPro;
              font-weight: 500;
              line-height: 36px;
            }
            .el-input__inner {
              &::placeholder {
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
              &::-webkit-input-placeholder {
                /* Chrome/Opera/Safari */
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
              &:-moz-placeholder {
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
              &::-moz-placeholder {
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
              &:-ms-input-placeholder {
                font-size: 16px;
                font-family: DINPro;
                font-weight: 500;
                color: #ffffff;
                text-align: center;
                opacity: 0.3;
              }
            }
          }
        }
      }
    }
    .exchanges {
      width: 100%;
    }
  }
  // 点击后方向
  /deep/ .el-collapse-item__arrow.is-active {
    transform: rotate(-90deg);
  }
  //  默认方向
  /deep/ .el-collapse-item__arrow,
  .el-tabs__nav {
    transform: rotate(90deg);
  }
  /deep/.el-icon-arrow-right:before {
    font-size: 20px;
    color: #a6a6a6 !important;
  }
}
.mingraator {
  width: 100%;
  display: flex;
  margin-top: 30px;
  .mingraator-div {
    width: 202px;
    height: 40px;
    background: #2f2a2b;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
      margin-right: 8px;
    }
    span {
      font-size: 16px;
      font-family: DINPro;
      font-weight: 500;
      color: #e1e1e1;
    }
  }
}
.button-box {
  margin: 30px 37px;
  display: flex;
  justify-content: space-between;
  .reset-btn,
  .close-btn {
    width: 300px;
    height: 50px;
  }
}
/deep/.el-input__inner {
  outline: none;
  border-color: #262626 !important;
}
/deep/.el-input__inner:focus {
  outline: none;
  border-color: #f7cf2d !important;
}
</style>
<style>
.el-collapse-item__header {
  border-bottom: 1px solid #333333;
}
</style>