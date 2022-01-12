<template>
  <div class="box">
    <div class="multiple">
      <div class="multiple-top">
        <div class="block">
          <el-slider v-model="multioleValue"
                     :step="0.1"
                     :min="1"
                     :max="3"
                     :show-tooltip="false"
                     @change="handleSlideChange">
          </el-slider>
        </div>
        <input v-model="slideValueShow"
               type="text"
               disabled="disabled" />
      </div>
      <div class="multiple-bottom">
        <span><img :src="slidePrompt"
               alt=""> Leverage> 2x lead to risk value increase Please be careful with</span>
      </div>
      <div class="button-box">
        <CustomButton type="border"
                      title="Reset"
                      class="reset-btn"
                      @click="handleResetClick" />
        <CustomButton type="primary"
                      title="Close"
                      class="close-btn"
                      @click="handleCloseBtnClick" />
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import types from 'types'
export default {
  data () {
    return {
      multioleValue: 1,
      slidePrompt: require('img/slidePrompt.png'),
    }
  },
  computed: {
    slideValueShow () {
      return this.multioleValue + ' X'
    },
    ...mapState({
      stepValue: state => state.swap.swapLeverageSlideValue
    }),

  },
  mounted () {
    console.log(this.stepValue)
    if (this.stepValue) {
      this.multioleValue = this.stepValue;
    }
  },
  methods: {
    handleCloseBtnClick () {
      this.$emit('close')
    },
    /**
     * 监听slide滑块值改变
     */
    handleSlideChange (val) {
      this.$store.commit(types.SWAP_LEVERAGE_SLIDE_VALUE, val)
    },
    /**
     * 重置
     */
    handleResetClick () {
      this.multioleValue = 1
      this.$store.commit(types.SWAP_LEVERAGE_SLIDE_VALUE, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  position: relative;
}
.multiple {
  margin: 120px 37px 0 37px;
  .multiple-top {
    width: 416px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 160px 0 126px;
    .block {
      margin-left: 12px;
      width: 313px;
      /deep/.el-slider__runway {
        background: #a1a1a1;
      }
      /deep/.el-slider__button {
        width: 28px;
        height: 15px;
        background: url("../../assets/images/sliders.png") no-repeat;
        background-size: 100%;
        border: none;
        box-shadow: 0px 0px 5px 0px #262222, 0px 0px 5px 0px #f0df9f;
        border-radius: 4px;
      }
      /deep/.el-slider__bar {
        background: linear-gradient(90deg, #6ed281, #e75e59);
      }
    }
    input {
      width: 76px;
      height: 26px;
      background: #4b4545;
      border: 0px solid #f0b90b;
      border-radius: 4px;
      text-align: center;
    }
  }
  .multiple-bottom {
    margin: 20px 0 80px 126px;
    span {
      font-size: 12px;
      font-family: DINPro;
      font-weight: 400;
      color: #f0670b;
      line-height: 12px;
    }
  }
  .button-box {
    display: flex;
    justify-content: space-between;
    .el-button {
      width: 300px;
      height: 50px;
    }
    .reset-btn,
    .close-btn {
      width: 300px;
      height: 50px;
    }
  }
}
/deep/ input {
  font-size: 12px;
  font-family: DINPro;
  font-weight: 500;
  color: #ffffff !important;
  line-height: 2px;
  opacity: 0.8;
}
</style>