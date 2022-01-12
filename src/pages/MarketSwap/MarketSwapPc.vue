
<template>
  <div>
    <div class="card-wrap">
      <div class="card-head">
        <div class="head-left">Leverage Swap</div>
        <div class="head-right">
          <el-tooltip class="item"
                      effect="dark"
                      content="Multiple"
                      placement="top">
            <div class="reverage"
                 :style="{color: isReverageShow ? '#f0b90b' : '#ffffff'}"
                 @click="handleReverageClick">{{stepValue}} X</div>
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      content="Settings"
                      placement="top">
            <div class="setting"
                 @click="handleSettingClick">
              <img :src="isSettingShow ? settingSelectImg : settingImg"
                   alt="">
            </div>
          </el-tooltip>
          <el-tooltip class="item"
                      effect="dark"
                      content="Records"
                      placement="top">
            <div class="record"
                 @click="handleRecordsClick">
              <img :src="isRecordsShow ? recordSelectedImg : recordImg"
                   alt="">
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="card-content">
        <SwapPc v-if="isSwapShow" />
        <RecordPc v-if="isRecordsShow"
                  @close="handleSwapClick" />
        <SettingPc v-if="isSettingShow"
                   @close="handleSwapClick" />
        <ReveragePc v-if="isReverageShow"
                    @close="handleSwapClick" />
      </div>

      <div class="mask-middle"></div>
      <div class="mask-inner"></div>
    </div>
  </div>
</template>

<script>
import SwapPc from 'comp/Swap/SwapPc.vue'
import RecordPc from 'comp/Record/RecordPc.vue'
import SettingPc from 'comp/Setting/SettingPc.vue'
import ReveragePc from 'comp/Trade/TradePercent.vue'
import { mapState } from 'vuex'
export default {
  components: {
    SwapPc,
    RecordPc,
    SettingPc,
    ReveragePc,
  },
  data () {
    return {
      recordImg: require('img/records.png'),
      recordSelectedImg: require('img/records-select.png'),
      settingImg: require('img/setting.png'),
      settingSelectImg: require('img/setting-select.png'),
      isReverageShow: false, // 杠杆倍数设置是否显示
      isSettingShow: false, // 设置界面是否显示
      isRecordsShow: false, // 记录界面是否显示
      isSwapShow: true, // swap界面默认显示
    }
  },
  computed: {
    ...mapState({
      stepValue: state => state.swap.swapLeverageSlideValue,
      isMobile: state => state.isMobile
    })
  },
  methods: {
    /**
     * 杠杆倍数点击
     */
    handleReverageClick () {
      this.resetCardShow('reverage')
    },
    /**
     * Setting 点击
     */
    handleSettingClick () {
      this.resetCardShow('set')
    },
    /**
     * records 点击
     */
    handleRecordsClick () {
      this.resetCardShow('records')
    },
    /**
     * 点击跳转兑换
     */
    handleSwapClick () {
      this.resetCardShow('')
    },
    /**
     * 根据传参显示相应页面
     */
    resetCardShow (name) {
      this.reset()
      if (name === 'set') {
        this.isSettingShow = true
      } else if (name === 'reverage') {
        this.isReverageShow = true
      } else if (name === 'records') {
        this.isRecordsShow = true
      } else {
        this.isSwapShow = true
      }
    },
    /**
     * 重置页面显示
     */
    reset () {
      this.isSwapShow = false
      this.isReverageShow = false
      this.isSettingShow = false
      this.isRecordsShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.market-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #111111;
  .card-wrap {
    margin-top: 194px;
    position: relative;
    width: 700px;
    min-height: 658px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    border: 1px solid #2b2e31;
    box-shadow: 0px 1px 24px 0px rgba(19, 15, 8, 0.89) inset,
      0px 1px 57px 0px rgba(71, 71, 74, 0.3) inset;
    border-radius: 23px;
    z-index: 101;
    .card-head {
      width: 100%;
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-image: url("../../assets/images/swap-head-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-top-left-radius: 23px;
      border-top-right-radius: 23px;
      padding: 0 51px 0 41px;
      .head-left {
        font-size: 20px;
        font-family: DINPro;
        font-weight: bold;
        color: #ffffff;
        line-height: 2px;
      }
      .head-right {
        display: flex;
        align-items: center;
        .reverage {
          width: 80px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2b313d;
          border-radius: 6px;
          font-size: 20px;
          font-family: DINPro;
          font-weight: bold;
          color: #f0b90b;
          line-height: 2px;
          cursor: pointer;
        }
        .setting {
          margin-left: 10px;
          width: 80px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1d222d;
          border-radius: 6px;
          cursor: pointer;
          & > img {
            width: 25px;
            height: 25px;
          }
        }
        .record {
          margin-left: 10px;
          width: 80px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1d222d;
          border-radius: 6px;
          cursor: pointer;
          & > img {
            width: 24px;
            height: 29px;
          }
        }
      }
    }
    .card-content {
      display: flex;
      flex-direction: column;
      background-image: url("../../assets/images/swap-content-bg.png");
      background-size: 100%;
      background-repeat: repeat-y;
      border-bottom-left-radius: 23px;
      border-bottom-right-radius: 23px;
    }
    .mask-middle {
      width: 771px;
      height: 549px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #181a1e;
      opacity: 0.5;
      border-radius: 12px;
      z-index: -1;
    }
    .mask-inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 836px;
      height: 453px;
      background: #181a1e;
      opacity: 0.3;
      border-radius: 12px;
      z-index: -10;
    }
  }
}
</style>