<template>
  <div class="amount-show">
    <p>{{titleLeft}}</p>
    <div class="show-content">
      <div class="content-left"
           :style="{cursor: ifShowImg?'pointer':'default'}"
           @click="ifShowImg?handleFromClick():''">
        <img v-if="ifShowImg"
             :src="usdtImg"
             alt="">
        <span>{{token}}</span>
        <i v-if="ifShowImg"
           :class="isFromSelect ? 'up' : ''"></i>
        <CustomSelect v-if="isFromSelect" />
      </div>
      <div class="content-right">
        <span>{{tokenRight}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from 'comp/Select/CustomSelect.vue'
export default {
  components: {
    CustomSelect
  },
  props: {
    titleName: {
      type: String,
      require: true
    },
    ifShowImg: {
      type: Boolean,
      require: false
    },
    titleLeft: {
      type: String,
      require: false
    },
    token: {
      type: String,
      require: false
    },
    tokenRight: {
      type: String,
      require: false
    }
  },
  data () {
    return {
      usdtImg: require('img/usdt.png'),
      rightImg: require('img/icon-right.png'),
      isFromSelect: false,
    }
  },
  methods: {
    /**
     * 点击From币种选择
     */
    handleFromClick () {
      this.isFromSelect = !this.isFromSelect
    },
  }
}
</script>

<style lang="less" scoped>
.amount-show {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  & > p {
    font-size: 14px;
    font-family: DINPro;
    font-weight: 500;
    color: #ffffff;
    opacity: 0.6;
    text-align: left;
  }
  .show-content {
    margin-top: 20px;
    width: 100%;
    background: #4a4545;
    border-radius: 4px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .content-left {
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      & > img {
        width: 28px;
        height: 28px;
      }
      & > span {
        margin-left: 8px;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        line-height: 11px;
      }
      & > i {
        width: 10px;
        height: 5px;
        margin-left: 6px;
        background: url("../../assets/images/arrow-down.png") no-repeat;
        background-size: 100%;
        transition: 0.2s;
      }
      .up {
        transform: rotate(180deg);
      }
    }
    .content-mid {
      display: flex;
      align-items: center;
      font-size: 12px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
      opacity: 0.6;
      margin: 0 10px;
    }
    .content-right {
      display: flex;
      align-items: center;

      & > span {
        font-size: 12px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        opacity: 0.6;
      }
    }
  }
}
/deep/.select-option {
  top: 40px;
  left: 0;
}
</style>