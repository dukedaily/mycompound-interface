<template>
  <div class="card-container"
       :style="{marginTop: hasMask ? '30px' : '0'}">
    <div class="bottom-card"
         :class="hasMask ? 'bottom-card-mask' : ''">
      <ul>
        <li v-for="(item, index) in cardLists"
            :key="index">
          <span>{{item.name}}</span>
          <div class="card-right">
            <el-tooltip class="item"
                        effect="dark"
                        placement="top"
                        v-if="!item.isPair && item.isToolTipSingle">
              <div slot="content"
                   class="tooltip">
                <span>{{formatnumberFn(item.supplyRate, 2)}}</span>
                <span>%+</span>
                <span>{{formatnumberFn(item.distributionSupplyRate, 2)}}</span>
                <span>%</span>
              </div>
              <span>{{formatnumberFn(item.supplyRate + item.distributionSupplyRate, 2)}}%</span>
            </el-tooltip>
            <span v-if="!item.isPair && !item.isToolTipSingle">{{item.coinName}}</span>
            <div class="pair"
                 v-if="item.isPair">
              <span>{{item.pairFront}}</span>
              <img :src="rightImg"
                   alt="">
              <span>{{item.pairAfter}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatnumber } from 'utils/index.js'
export default {
  props: {
    hasMask: {
      type: Boolean,
      require: false
    },
    cardLists: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      rightImg: require('img/icon-right.png')
    }
  },
  methods: {
    /**
     * 截取两位小数
     */
    formatnumberFn (num, count) {
      return formatnumber(num, count)
    }
  }
}
</script>

<style lang="less" scoped>
.card-container {
  padding: 0 40px;
  .bottom-card {
    width: 100%;
    padding: 30px 20px;
    border-radius: 6px;
    ul {
      display: flex;
      flex-direction: column;
      li {
        margin-top: 7px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > span {
          font-size: 14px;
          font-family: DINPro;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.8;
        }
        .card-right {
          display: flex;
          align-items: center;
          .item {
            padding-bottom: 10px;
            border-bottom: 1px dashed rgba(240, 185, 11, 0.3);
          }
          span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.8;
          }
          .pair {
            display: flex;
            align-items: center;
            span {
              font-size: 14px;
              font-family: DINPro;
              font-weight: 400;
              color: #ffffff;
              opacity: 0.8;
            }
            & > img {
              width: 13px;
              height: 9px;
              margin: 0 2px;
            }
          }
        }
      }
    }
  }
  .bottom-card-mask {
    background: rgba(38, 34, 34, 0.6);
    border: 1px solid #312d2d;
  }
}
</style>