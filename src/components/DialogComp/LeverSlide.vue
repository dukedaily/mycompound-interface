<template>
  <div class="slide">
    <div class="balanceBox">
      <div class="balanceTitle">
        <span>Farm Leverage</span>
      </div>
    </div>
    <div class="block">
      <el-slider v-model="multioleValue"
                 :show-tooltip="false"
                 :step="0.1"
                 :max="3"
                 @change="handleSlideChange">
      </el-slider>
      <input v-model="slideValueShow"
             type="text"
             disabled="disabled" />
    </div>
    <div class="prompt">
      <span><img :src="slidePrompt"
             alt=""> Leverage> 2x lead to risk value increase Please be careful with</span>
    </div>
  </div>
</template>

<script>
import { formatnumber } from 'utils/index.js'
import types from 'types'
export default {
  data () {
    return {
      multioleValue: 0,
      slidePrompt: require('img/slidePrompt.png'),
    }
  },
  methods: {
    /**
     * 强制截取两位小数
     */
    formatnumberFn (num, count) {
      return formatnumber(num, count)
    },
    /**
     * 监听slide滑块值改变
     */
    handleSlideChange (val) {
      this.$store.commit(types.SWAP_LEVERAGE_SLIDE_VALUE, val)
    },
  },
  computed: {
    slideValueShow () {
      return this.formatnumberFn(this.multioleValue, 2) + ' X'
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  }
}
</script>
<style lang="less" scoped>
.slide {
  display: flex;
  padding: 0 40px;
  flex-direction: column;
  .balanceBox {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .balanceTitle {
      border-bottom: 1px dashed rgba(240, 185, 11, 0.3);
      height: 20px;
      line-height: 11px;
      & > span {
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        opacity: 0.6;
      }
    }
  }
  .block {
    width: 100%;
    height: 28px;
    display: flex;
    align-items: center;
    margin: 16px 0 20px 0;
    .el-slider {
      width: 313px;
      margin-right: 25px;
    }
    /deep/.el-slider__runway {
      background: #a1a1a1;
    }
    /deep/.el-slider__button {
      width: 28px;
      height: 15px;
      margin: 10px 0px 0 16px;
      border: none;
      box-shadow: 0px 0px 5px 0px #252222, 0px 0px 5px 0px #eddea7;
      border-radius: 4px;
      background: url("../../assets/images/sliders.png") no-repeat;
      background-size: 100%;
    }
    /deep/.el-slider__bar {
      background: linear-gradient(90deg, #6ed281, #e75e59);
    }

    input {
      width: 76px;
      height: 26px;
      background: #4b4545;
      border: 0px solid #f0b90b;
      border-radius: 4px;
      text-align: center;
    }
    /deep/ input {
      font-size: 12px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff !important;
      line-height: 2px;
      opacity: 0.8;
    }
  }
  .prompt {
    span {
      font-size: 12px;
      font-family: DINPro;
      font-weight: 400;
      color: #f0670b;
      line-height: 12px;
    }
  }
}
</style>