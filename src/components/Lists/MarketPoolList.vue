<template>
  <div class="content-bottom">
    <div class="record-container">
      <div class="wrap title">
        <div class="column asset">
          Pool
        </div>
        <div class="column totalSupply">
          TVL
        </div>
        <div class="column borrowed">
          APR
        </div>
        <div class="column apr aprLeft">
          Leverage
        </div>
        <div class="column apy apyLeft">
          Action
        </div>
      </div>
      <div class="item-box">
        <div class="wrap item"
             v-for="(item, index) in marketLists"
             :key="index">
          <div class="leftLine"></div>
          <div class="column asset">
            <img class="coin-img"
                 :src="item.usdcImg"
                 alt="">
            <span>{{item.tokenASymbol}} / {{item.tokenBSymbol}}</span>
          </div>
          <div class="column totalSupply">
            <span>{{item.tvl}}</span>
          </div>
          <div class="column borrowed">
            <div>{{item.totalApr}}%</div>
            <div>
              <span>{{item.miningIncomeRateLeverage}}%</span>
              <span> - </span>
              <span>{{item.borrowInterestRateLeverage}}%</span>
              <span> + </span>
              <img :src="projectSide"
                   alt="">
              <span>{{item.platformLoanRewards}}%</span>
            </div>
          </div>
          <div class="column aprContent">
            <button v-waves
                    @click="lessBtn(item.leverageStep,index)">-</button>
            <input type="text"
                   name=""
                   v-model="item.leverageStep">
            <button v-waves
                    @click="addBtn(item.leverageStep,index,item.leverageMax)">+</button>
          </div>
          <div class="column buttons apy">
            <CustomButton type="primary"
                          :title="'Farm ' + item.leverageStep +'X'"
                          class="farmBtn"
                          @click="handleFarmClick" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dialogType } from 'utils/enum.js'
import waves from '@/directive/waves'
import { getCoinImg, formatnumber, formatSizeKmb } from 'utils/index.js'
import types from 'types'
export default {
  directives: { waves },
  props: {
    marketLists: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      projectSide: require('img/projectSide.png'),
    }
  },
  methods: {
    // 计数器
    lessBtn (val, index) {
      if (val > 1) {
        this.marketLists[index].leverageStep = val - 0.5;
      }
    },
    addBtn (val, index, max) {
      if (val < Number(max)) {
        this.marketLists[index].leverageStep = val + 0.5;
      }
    },
    /**
     * 转换K.M.B单位
     */
    formatSize (num) {
      return formatSizeKmb(num)
    },
    /**
     * 强制截取两位小数
     */
    formatnumberFn (num, count) {
      return formatnumber(num, count)
    },
    /**
     * 获取服务器图片地址
     */
    getCoinImg (url) {
      return getCoinImg(url);
    },
    /**
     * farm点击
     */
    handleFarmClick () {
      this.$store.commit(types.DIALOG_TYPE, dialogType.MARKET_POOL_FARM)
    }
  }
}
</script>

<style lang="less" scoped>
.content-bottom {
  width: 1200px;
  margin-bottom: 150px;
  border-radius: 12px;
  .record-container {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABLAAAACMCAIAAADjtMddAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF7GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0NDYwLCAyMDIwLzA1LzEyLTE2OjA0OjE3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA2LTA4VDE0OjM1OjQyKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNi0wOFQxNDozNjoyMCswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNi0wOFQxNDozNjoyMCswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxYzA4NzE1YS1jYTRhLTRiZDMtOWY3ZS01NDhmOTAzOWY5NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTZGMEYyRjBDMDQ4MTFFQkIyNjM4NDdGNTJCRDBDNEEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNkYwRjJGMEMwNDgxMUVCQjI2Mzg0N0Y1MkJEMEM0QSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE2RjBGMkVEQzA0ODExRUJCMjYzODQ3RjUyQkQwQzRBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjE2RjBGMkVFQzA0ODExRUJCMjYzODQ3RjUyQkQwQzRBIi8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjFjMDg3MTVhLWNhNGEtNGJkMy05ZjdlLTU0OGY5MDM5Zjk0OCIgc3RFdnQ6d2hlbj0iMjAyMS0wNi0wOFQxNDozNjoyMCswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4WQA1gAABPhJREFUeJzt2rENg0AQRcHFQkcLSO6/SIgc0AMO3rzkpoXV/e17nsda133PDAAAAAAAAHTwGUmSJElSsv25C4+1ZgYAAAAAAAA62J/n+vdPJQAAAAAAALwMk1FJkiRJimYyCgAAAAAAEIXJKAAAAAAAQBQmo5IkSZIUzWQUAAAAAAAgCpNRAAAAAACAKExGJUmSJCmaySgAAAAAAEAUJqMAAAAAAABRmIxKkiRJUjSTUQAAAAAAgChMRgEAAAAAAKIwGZUkSZKkaCajAAAAAAAAUZiMAgAAAAAARGEyKkmSJEnRTEYBAAAAAACiMBkFAAAAAACIwmRUkiRJkqKZjAIAAAAAAERhMgoAAAAAABCFyagkSZIkRTMZBQAAAAAAiMJkFAAAAAAAIAqTUUmSJEmKZjIKAAAAAAAQhckoAAAAAABAFCajkiRJkhTNZBQAAAAAACAKk1EAAAAAAIAoTEYlSZIkKZrJKAAAAAAAQBQmowAAAAAAAFGYjEqSJElSNJNRAAAAAACAKExGAQAAAAAAojAZlSRJkqRoJqMAAAAAAABRmIwCAAAAAABEYTIqSZIkSdFMRgEAAAAAAKIwGQUAAAAAAIjCZFSSJEmSopmMAgAAAAAARGEyCgAAAAAAEIXJqCRJkiRFMxkFAAAAAACIwmQUAAAAAAAgCpNRSZIkSYpmMgoAAAAAABCFySgAAAAAAEAUJqOSJEmSFM1kFAAAAAAAIAqTUQAAAAAAgChMRiVJkiQpmskoAAAAAABAFCajAAAAAAAAUZiMSpIkSVI0k1EAAAAAAIAoTEYBAAAAAACiMBmVJEmSpGgmowAAAAAAAFGYjAIAAAAAAERhMipJkiRJ0UxGAQAAAAAAojAZBQAAAAAAiMJkVJIkSZKimYwCAAAAAABEYTIKAAAAAAAQhcmoJEmSJEUzGQUAAAAAAIjCZBQAAAAAACAKk1FJkiRJimYyCgAAAAAAEIXJKAAAAAAAQBQmo5IkSZIUzWQUAAAAAAAgCpNRAAAAAACAKExGJUmSJCmaySgAAAAAAEAUJqMAAAAAAABRmIxKkiRJUjSTUQAAAAAAgChMRgEAAAAAAKIwGZUkSZKkaCajAAAAAAAAUZiMAgAAAAAARGEyKkmSJEnRTEYBAAAAAACiMBkFAAAAAACIwmRUkiRJkqKZjAIAAAAAAERhMgoAAAAAABCFyagkSZIkRTMZBQAAAAAAiMJkFAAAAAAAIAqTUUmSJEmKZjIKAAAAAAAQhckoAAAAAABAFCajkiRJkhTNZBQAAAAAACAKk1EAAAAAAIAoTEYlSZIkKZrJKAAAAAAAQBQmowAAAAAAAFGYjEqSJElSNJNRAAAAAACAKExGAQAAAAAAojAZlSRJkqRoJqMAAAAAAABRmIwCAAAAAABEYTIqSZIkSdFMRgEAAAAAAKIwGQUAAAAAAIjCZFSSJEmSopmMAgAAAAAARGEyCgAAAAAAEIXJqCRJkiRFMxkFAAAAAACIwmQUAAAAAAAgCpNRSZIkSYpmMgoAAAAAABCFySgAAAAAAEAUJqOSJEmSFM1kFAAAAAAAIAqTUQAAAAAAgChMRiVJkiQpmskoAAAAAABAFCajAAAAAAAAUZiMSpIkSVI0k1EAAAAAAIAoTEYBAAAAAACiMBmVJEmSpGgmowAAAAAAAFGYjAIAAAAAAERhMipJkiRJ0X7KIJWnBUisKwAAAABJRU5ErkJggg==);
    background-repeat: repeat;
    background-size: 100%;
    border-radius: 12px;
    width: 100%;
    box-shadow: 0px 1px 12px 0px #130f08,
      0px 1px 6px 0px rgba(240, 185, 11, 0.3) inset;
    .wrap {
      display: flex;
      align-items: center;
      .column {
        font-size: 16px;
        font-family: DINPro;
        font-weight: 400;
        color: #ffffff;
      }
      // .column:first-child {
      //   margin-left: 40px;
      // }
      .totalSupply {
        width: 249px;
      }
      .asset {
        width: 253px;
        margin-left: 40px;
      }
      .borrowed {
        width: 281px;
      }
      .apr {
        width: 120px;
        text-align: center;
        margin-right: 107px;
      }
      .aprContent {
        width: 120px;
        display: flex;
        margin-right: 107px;
        height: 28px;

        input {
          color: #ffffff;
          width: 40px;
          font-size: 14px;
          text-align: center;
          background: #111111;
          box-shadow: inset 0px 0px 6px 0px rgba(240, 185, 11, 0.3);
        }
        button {
          width: 40px;
          color: #ffffff;
          background: #353030ff;
          font-size: 18px;
          font-weight: bold;
          background: #282828;
        }
        button:first-child {
          box-shadow: 2px 0 6px -1px rgba(240, 185, 11, 0.2) inset,
            0 -2px 6px -1px rgba(240, 185, 11, 0.2) inset,
            0 2px 6px -1px rgba(240, 185, 11, 0.2) inset;
        }
        button:last-child {
          box-shadow: -1px 0 6px -1px rgba(240, 185, 11, 0.2) inset,
            0 -2px 6px -1px rgba(240, 185, 11, 0.2) inset,
            0 2px 6px -1px rgba(240, 185, 11, 0.2) inset;
        }
      }
      .apy {
        width: 110px;
        text-align: center;
      }
    }
    .title {
      height: 70px;
      border-bottom: 1px solid #282828;
    }
    .item {
      display: flex;
      align-items: center;
      height: 70px;
      border-bottom: 1px solid #282828;
      position: relative;
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
          font-size: 14px;
          font-family: DINPro;
          font-weight: 500;
          color: #ffffff;
        }
      }

      .asset {
        display: flex;
        flex-direction: row;
        align-items: center;
        span {
          margin-left: 8px;
          font-size: 14px;
          font-family: DINPro;
          font-weight: 500;
          color: #ffffff;
        }
      }
      .borrowed {
        display: flex;
        // align-items: center;
        flex-direction: column;
        div {
          font-family: DINPro;
          font-weight: 400;
          color: #ffffff;
          font-size: 12px;
          font-weight: 400;
          color: #ffffff;
          // opacity: 0.6;
        }
        div:first-child {
          font-weight: 500;
          opacity: 1;
          font-size: 14px;
          margin-bottom: 8px;
        }
        & > span {
          font-size: 12px;
          font-family: DINPro;
          font-weight: 400;
          color: #ffffff;
          // opacity: 0.6;
        }
        & > img {
          width: 12px;
          height: 10px;
        }
      }
    }
    .item:last-child {
      border: none;
    }
    .item:hover {
      background: #282828;
      .leftLine {
        display: block;
      }
    }
  }
}
</style>