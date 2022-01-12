
<template>
  <div class="box">
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
        <SwapH5 v-if="isSwapShow" />
        <!-- <RecordPc v-if="isRecordsShow"
                  @close="handleSwapClick" />
        <SettingPc v-if="isSettingShow"
                   @close="handleSwapClick" />
        <ReveragePc v-if="isReverageShow"
                    @close="handleSwapClick" /> -->
      </div>

    </div>
  </div>
</template>

<script>
import SwapH5 from 'comp/Swap/SwapH5.vue'
// import RecordPc from 'comp/Record/RecordPc.vue'
// import SettingPc from 'comp/Setting/SettingPc.vue'
// import ReveragePc from 'comp/Trade/TradePercent.vue'
import { mapState } from 'vuex'
export default {
  components: {
    SwapH5,
    // RecordPc,
    // SettingPc,
    // ReveragePc,
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
.box {
  margin-top: 110px;
  width: 100%;
  position: relative;
  background: #111111;
  display: flex;
  .card-wrap {
    width: calc(100% - 30px);
    margin: 0 15px;
    border-radius: 8px;
    background: #181a1eff;
    .card-head {
      height: 76px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-image: url("../../assets/images/swap-head-bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 13px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      .head-left {
        font-size: 16px;
        font-family: DINPro;
        font-weight: bold;
        color: #ffffff;
        line-height: 2px;
        margin-left: 15px;
      }
      .head-right {
        display: flex;
        align-items: center;
        .reverage {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2b313d;
          border-radius: 6px;
          font-size: 15px;
          font-family: DINPro;
          font-weight: bold;
          color: #f0b90b;
          line-height: 2px;
          cursor: pointer;
        }
        .setting {
          margin-left: 5px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1d222d;
          border-radius: 6px;
          cursor: pointer;
          & > img {
            width: 16px;
            height: 16px;
          }
        }
        .record {
          margin: 0 15px 0 5px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1d222d;
          border-radius: 6px;
          cursor: pointer;
          & > img {
            width: 14px;
            height: 16px;
          }
        }
      }
    }
    .card-content {
      width: 100%;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAABGCAYAAAAuLEcVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkU5OTMwNUFCRjEzMTFFQjhFMkU5Qzc2NjVFRDFDQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkU5OTMwNTlCRjEzMTFFQjhFMkU5Qzc2NjVFRDFDQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFMkVBMzA0MkJGMEMxMUVCOEUyRTlDNzY2NUVEMUNCQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFMkVBMzA0M0JGMEMxMUVCOEUyRTlDNzY2NUVEMUNCQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrZOf+MAAAIbSURBVHja7NqxDYAwDEVBYymZAVGw/2QMkTTgLZB1rs7tr99xXvcT3+29YowZzMzMzMydnIW6epiZmZmZuzmNwMzMzMydnUZgZmZm5s6WNDAzMzOzpIGZmZmZWdLAzMzMzCxpYGZmZmaWNDAzMzMzSxqYmZmZmSUNzMzMzCxpMAIzMzMzSxqYmZmZmSUNzMzMzMySBmZmZmZmSQMzMzMzs6SBmZmZmVnSwMzMzMySBiMwMzMzs6SBmZmZmVnSwMzMzMwsaWBmZmZmljQwMzMzM0samJmZmZklDczMzMwsaTACMzMzM0samJmZmZklDczMzMzMkgZmZmZmZkkDMzMzM7OkgZmZmZlZ0sDMzMzMkgaDMDMzM7OkgZmZmZlZ0sDMzMzMLGlgZmZmZpY0MDMzMzNLGpiZmZmZJQ3MzMzMLGkwCDMzMzNLGpiZmZmZJQ3MzMzMzJIGZmZmZmZJAzMzMzOzpIGZmZmZWdLAzMzMzJIGgzAzMzOzpIGZmZmZWdLAzMzMzCxpYGZmZmaWNDAzMzMzSxqYmZmZmSUNzMzMzCxpMAgzMzMzSxqYmZmZmSUNzMzMzMySBmZmZmZmSQMzMzMzs6SBmZmZmVnSwMzMzMySBoMwMzMzs6SBmZmZmVnSwMzMzMwsaWBmZmZmljQwMzMzM0samJmZmZklDczMzMwsaTAIMzMzM0samJmZmZklDczMzMzM//ErwACBAHPzZtfc3wAAAABJRU5ErkJggg==);
      background-size: 100%;
      background-repeat: repeat-y;
      border-radius: 8px;
    }
  }
}
</style>