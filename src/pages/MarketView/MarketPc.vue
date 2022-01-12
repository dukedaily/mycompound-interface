<template>
  <div class="content">
    <div class="content-top">
      <div class="market-size">
        <img :src="marketRight"
             alt="">
        <span>Market Size</span>
        <img :src="marketLeft"
             alt="">
      </div>
      <div class="market-num">
        <template v-if="listType">
          <span class="num-font-color">$</span>
          <countTo :startVal="startVal"
                   :endVal='totalVal'
                   :decimals="2"
                   :duration='500'></countTo>
        </template>
        <span v-else>
          --
        </span>
      </div>
    </div>
    <div class="content-center">
      Market
    </div>
    <div class="content-bottom">
      <div class="record-container">
        <div class="wrap title">
          <div class="column asset">
            Tokens
          </div>
          <div class="column totalSupply">
            Total Supply
          </div>
          <div class="column borrowed">
            Total Borrow
          </div>
          <div class="column apr">
            Supply APR
          </div>
          <div class="column apy">
            Borrow APY
          </div>
        </div>
        <div class="item-box"
             v-if="listType">
          <div class="wrap item"
               v-for="(item, index) in dataList"
               :key="index">
            <div class="leftLine"></div>
            <div class="column asset">
              <img class="coin-img"
                   :src="getCoinImg(item.underlyingAddress)"
                   alt="">
              <span>{{item.underlyingSymbol}}</span>
            </div>
            <div class="column totalSupply">
              <el-tooltip effect="dark"
                          :content="item.totalSupplyTool"
                          placement="top-start">
                <span class="hoverText">${{item.totalSupplyMoney}}</span>
              </el-tooltip>
              <span>
                <el-tooltip effect="dark"
                            :content="item.totalSupplyBottomTool"
                            placement="top-start">
                  <span class="smallText hoverText">{{item.totalSupplyToken}} {{item.underlyingSymbol}}</span>
                </el-tooltip>
              </span>
            </div>

            <div class="column borrowed">
              <el-tooltip effect="dark"
                          :content="item.totalBorrowsTool"
                          placement="top-start">
                <span class="hoverText">${{item.totalBorrowsMoney}}</span>
              </el-tooltip>
              <span>
                <el-tooltip effect="dark"
                            :content="item.totalBorrowsBottomTool"
                            placement="top-start">
                  <span class="smallText hoverText">{{item.totalBorrowsToken}} {{item.underlyingSymbol}}</span>
                </el-tooltip>
              </span>
            </div>
            <div class="column apr">
              <div>
                <el-tooltip effect="dark"
                            :content="item.supplyApySix + '%'"
                            placement="top-start">
                  <span class="aprTopSpan hoverText">{{item.supplyApy}}%</span>
                </el-tooltip>
              </div>
              <div>
                <el-tooltip effect="dark"
                            :content="item.supplyRatesSix + '% ' + ' + ' +item.distributionSupplyRateSix + '%'"
                            placement="top-start">
                  <template>
                    <span class="hoverText">{{item.supplyRates}}% + <img :src="projectSide"
                           alt=""> <span>{{item.distributionSupplyRates}}%</span> </span>
                  </template>
                </el-tooltip>
              </div>
            </div>
            <div class="column apy">
              <div>
                <el-tooltip effect="dark"
                            :content="item.borrowApySix + '%'"
                            placement="top-start">
                  <span class="aprTopSpan hoverText">{{item.borrowApy}}%</span>
                </el-tooltip>
              </div>
              <div>
                <el-tooltip effect="dark"
                            :content="item.borrowRatesSix + '% ' + ' + ' +item.distributionBorrowRateSix + '%'"
                            placement="top-start">
                  <template>
                    <span class="hoverText">{{item.borrowRates}}% + <img :src="projectSide"
                           alt=""> <span>{{item.distributionBorrowRates}}%</span> </span>
                  </template>
                </el-tooltip>
              </div>
            </div>
            <div class="column buttons">
              <CustomButton type="primary"
                            title="Supply"
                            @click="handleSupplyClick(index)"
                            class="reset-btn" />
            </div>
          </div>
        </div>
        <div v-else
             class="noData">No Data</div>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <SupplyDialog v-if="dialogType === 3" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SupplyDialog from 'comp/Dialog/SupplyDialog.vue'
import { dialogType } from 'utils/enum.js'
import types from 'types'
import countTo from 'vue-count-to';
import { getCoinImg, formatnumber } from 'utils/index.js'
export default {
  components: {
    countTo,
    SupplyDialog
  },
  props: {
    recordLists: {
      type: Array
    },
    totalVal: {
      type: Number
    }
  },
  data () {
    return {
      marketLeft: require('img/marketLeft.png'),
      marketRight: require('img/marketRight.png'),
      projectSide: require('img/projectSide.png'),
      startVal: 0,
      listType: false,
      dataList: [],
    }
  },
  computed: {
    ...mapState({
      dialogType: state => state.dialogType
    }),
  },
  watch: {
    recordLists: {
      handler () {
        this.dataList = this.recordLists;
        this.listType = true;
      },
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  },
  methods: {
    /**
     * Supply 点击
     */
    handleSupplyClick (index) {
      this.$store.commit(types.INPUT_VALUE, '') // 重置输入框
      this.$store.commit(types.MARKET_ITEM_INDEX, index)
      this.$store.commit(types.DIALOG_TYPE, dialogType.MARKET_SUPPLY)
    },
    /**
     * 获取服务器图片地址
     */
    getCoinImg (url) {
      return getCoinImg(url);
    },
    /**
     * 强制截取两位小数
     */
    formatnumberFn (num, count) {
      return formatnumber(num, count)
    },
  }
}
</script>

<style scoped lang="less">
.content {
  width: 1200px;
  margin: 0 auto;
  padding-top: 148px;
  .content-top {
    width: 100%;
    height: 240px;
    box-shadow: -1px 12px 12px 0px rgba(10, 10, 7, 0.17) inset;
    border-radius: 12px;
    background-image: url("../../assets/images/marketBanner.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // opacity: 0.5;
    .market-size {
      display: flex;
      justify-content: center;
      flex-direction: row;
      width: 100%;
      height: 20px;
      padding-top: 48px;
      margin-bottom: 50px;
      img {
        width: 90px;
        height: 13px;
        margin-top: 4px;
      }
      span {
        line-height: 20px;
        font-size: 24px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        margin: 0 10px;
      }
    }
    .market-num {
      text-align: center;
      span {
        font-family: bold;
        height: 69px;
        line-height: 69px;
        font-size: 65px;
        color: #ffffff;
        // -webkit-text-stroke: 1px #ff9b01;
        background: linear-gradient(90deg, #ebe5d4 0%, #f8d12f 100%);
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .num-font-color {
        background: linear-gradient(90deg, #ebe5d4 0%, #ebe5d4 100%);
        // text-shadow: 0px 6px 10px #070707;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .content-center {
    height: 75px;
    background: #111111;
    font-size: 20px;
    font-family: DINPro;
    font-weight: bold;
    color: #f8d12f;
    line-height: 75px;
  }
  .content-bottom {
    margin-bottom: 200px;
    width: 1200px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAACMCAIAAADjtMddAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF7GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA2LTA4VDE0OjM1OjQyKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNi0wOFQxNDozNjoyMCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0wOFQxNDozNjoyMCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxYzA4NzE1YS1jYTRhLTRiZDMtOWY3ZS01NDhmOTAzOWY5NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTZGMEYyRjBDMDQ4MTFFQkIyNjM4NDdGNTJCRDBDNEEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNkYwRjJGMEMwNDgxMUVCQjI2Mzg0N0Y1MkJEMEM0QSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2RjBGMkVEQzA0ODExRUJCMjYzODQ3RjUyQkQwQzRBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE2RjBGMkVFQzA0ODExRUJCMjYzODQ3RjUyQkQwQzRBIi8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjFjMDg3MTVhLWNhNGEtNGJkMy05ZjdlLTU0OGY5MDM5Zjk0OCIgc3RFdnQ6d2hlbj0iMjAyMS0wNi0wOFQxNDozNjoyMCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4WQA1gAABPhJREFUeJzt2rENg0AQRcHFQkcLSO6/SIgc0AMO3rzkpoXV/e17nsda133PDAAAAAAAAHTwGUmSJElSsv25C4+1ZgYAAAAAAAA62J/n+vdPJQAAAAAAALwMk1FJkiRJimYyCgAAAAAAEIXJKAAAAAAAQBQmo5IkSZIUzWQUAAAAAAAgCpNRAAAAAACAKExGJUmSJCmaySgAAAAAAEAUJqMAAAAAAABRmIxKkiRJUjSTUQAAAAAAgChMRgEAAAAAAKIwGZUkSZKkaCajAAAAAAAAUZiMAgAAAAAARGEyKkmSJEnRTEYBAAAAAACiMBkFAAAAAACIwmRUkiRJkqKZjAIAAAAAAERhMgoAAAAAABCFyagkSZIkRTMZBQAAAAAAiMJkFAAAAAAAIAqTUUmSJEmKZjIKAAAAAAAQhckoAAAAAABAFCajkiRJkhTNZBQAAAAAACAKk1EAAAAAAIAoTEYlSZIkKZrJKAAAAAAAQBQmowAAAAAAAFGYjEqSJElSNJNRAAAAAACAKExGAQAAAAAAojAZlSRJkqRoJqMAAAAAAABRmIwCAAAAAABEYTIqSZIkSdFMRgEAAAAAAKIwGQUAAAAAAIjCZFSSJEmSopmMAgAAAAAARGEyCgAAAAAAEIXJqCRJkiRFMxkFAAAAAACIwmQUAAAAAAAgCpNRSZIkSYpmMgoAAAAAABCFySgAAAAAAEAUJqOSJEmSFM1kFAAAAAAAIAqTUQAAAAAAgChMRiVJkiQpmskoAAAAAABAFCajAAAAAAAAUZiMSpIkSVI0k1EAAAAAAIAoTEYBAAAAAACiMBmVJEmSpGgmowAAAAAAAFGYjAIAAAAAAERhMipJkiRJ0UxGAQAAAAAAojAZBQAAAAAAiMJkVJIkSZKimYwCAAAAAABEYTIKAAAAAAAQhcmoJEmSJEUzGQUAAAAAAIjCZBQAAAAAACAKk1FJkiRJimYyCgAAAAAAEIXJKAAAAAAAQBQmo5IkSZIUzWQUAAAAAAAgCpNRAAAAAACAKExGJUmSJCmaySgAAAAAAEAUJqMAAAAAAABRmIxKkiRJUjSTUQAAAAAAgChMRgEAAAAAAKIwGZUkSZKkaCajAAAAAAAAUZiMAgAAAAAARGEyKkmSJEnRTEYBAAAAAACiMBkFAAAAAACIwmRUkiRJkqKZjAIAAAAAAERhMgoAAAAAABCFyagkSZIkRTMZBQAAAAAAiMJkFAAAAAAAIAqTUUmSJEmKZjIKAAAAAAAQhckoAAAAAABAFCajkiRJkhTNZBQAAAAAACAKk1EAAAAAAIAoTEYlSZIkKZrJKAAAAAAAQBQmowAAAAAAAFGYjEqSJElSNJNRAAAAAACAKExGAQAAAAAAojAZlSRJkqRoJqMAAAAAAABRmIwCAAAAAABEYTIqSZIkSdFMRgEAAAAAAKIwGQUAAAAAAIjCZFSSJEmSopmMAgAAAAAARGEyCgAAAAAAEIXJqCRJkiRFMxkFAAAAAACIwmQUAAAAAAAgCpNRSZIkSYpmMgoAAAAAABCFySgAAAAAAEAUJqOSJEmSFM1kFAAAAAAAIAqTUQAAAAAAgChMRiVJkiQpmskoAAAAAABAFCajAAAAAAAAUZiMSpIkSVI0k1EAAAAAAIAoTEYBAAAAAACiMBmVJEmSpGgmowAAAAAAAFGYjAIAAAAAAERhMipJkiRJ0X7KIJWnBUisKwAAAABJRU5ErkJggg==);
    background-repeat: repeat;
    background-size: 100%;
    box-shadow: 0px 0px 5px 0px rgba(240, 185, 11, 0.3) inset,
      0px 1px 6px 0px #130f08;
    border-radius: 12px;
    .record-container {
      width: 100%;
      border-bottom-left-radius: 23px;
      border-bottom-right-radius: 23px;
      .noData {
        height: 140px;
        width: 100%;
        text-align: center;
        line-height: 140px;
        font-size: 16px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
      .wrap {
        display: flex;
        align-items: center;
        .column {
          font-size: 14px;
          font-family: DINPro;
          font-weight: 400;
          color: #ffffff;
          // opacity: 0.6;
        }
        .totalSupply {
          width: 210px;
        }
        .asset {
          width: 160px;
          margin-left: 40px;
        }
        .borrowed {
          width: 233px;
        }
        .apr {
          width: 210px;
        }
        .apy {
          width: 197px;
        }
      }
      .title {
        height: 70px;
        border-bottom: 1px solid #282828;
        div {
          opacity: 0.6;
        }
      }
      .item {
        display: flex;
        align-items: center;
        height: 70px;
        border-bottom: 1px solid #282828;
        .leftLine {
          position: absolute;
          width: 1px;
          height: 70px;
          background: #f0b90b;
          display: none;
        }
        .totalSupply {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          span:first-child {
            font-size: 16px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
            margin-bottom: 8px;
          }
          .smallText {
            font-size: 14px !important;
            font-family: DINPro;
            font-weight: 400 !important;
            color: #ffffff;
            opacity: 0.6;
          }
        }

        .asset {
          display: flex;
          flex-direction: row;
          align-items: center;
          span {
            margin-left: 8px;
            font-size: 16px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
        }
        .borrowed {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          span:first-child {
            font-size: 16px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
            margin-bottom: 8px;
          }

          .smallText {
            font-size: 14px !important;
            font-family: DINPro;
            font-weight: 400 !important;
            color: #ffffff;
            opacity: 0.6;
          }
        }
        .apr,
        .apy {
          display: flex;
          // align-items: center;
          flex-direction: column;
          div {
            font-family: DINPro;
            font-weight: 400;
            color: #ffffff;
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.6;
          }
          .aprTopSpan {
            font-size: 16px;
            font-family: DINPro;
            font-weight: 500;
            color: #ffffff;
          }
          div:first-child {
            font-weight: 500;
            opacity: 1;
            font-size: 16px;
            margin-bottom: 8px;
          }
          & > span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.6;
          }
          & > img {
            width: 12px;
            height: 10px;
          }
        }
        .buttons {
          width: 110px;
          height: 34px;
          .reset-btn {
            height: 34px;
            width: 110px;
          }
        }
      }
      .item:last-child {
        border: none;
      }
      .item:hover {
        background: #282828ff;
        .leftLine {
          display: block;
        }
      }
    }
  }
}
.textColor {
  margin-top: 5px;
  font-size: 12px;
  font-family: DINPro;
  font-weight: 400;
  color: #ffffff;
  opacity: 0.6;
  line-height: 12px;
  span {
    font-size: 12px;
    font-family: DINPro;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.6;
    line-height: 12px;
  }
  img {
    height: 12px;
    width: 10px;
  }
}
button {
  border: none;
  width: 110px;
  height: 34px;
  background: radial-gradient(circle, #f8d12f, #dba909);
  box-shadow: 0px 0px 4px 0px #ffe375, 0px 1px 3px 0px #fff0b7;
  border-radius: 6px;
  font-size: 14px;
  font-family: DINPro;
  font-weight: bold;
  color: #1a1818;
}
button:hover {
  cursor: pointer;
}
.firstAssets {
  display: flex;
  align-items: center;
  img {
    width: 36px;
    height: 36px;
  }
  span {
    margin-left: 8px;
  }
}
.hoverText {
  cursor: pointer;
}
</style>