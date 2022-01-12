<template>
  <div class="card-container">
    <div class="bottom-card">
      <ul>
        <li v-for="(item, index) in cardLists"
            :key="index">
          <span class="spanName">{{item.name}}</span>
          <div class="card-right">
            <div class="pair">
              <img v-if="item.imgShow"
                   :src="item.sigleRed"
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
      rightImg: require('img/icon-right.png'),

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
  margin-top: 20px;
  padding: 0 40px;
  .bottom-card {
    width: 100%;
    padding: 10px 20px;
    border-radius: 6px;
    background: rgba(38, 34, 34, 0.6);
    border: 1px solid #312d2d;
    ul {
      display: flex;
      flex-direction: column;
      li {
        margin-bottom: 12px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > span {
          font-size: 14px;
          font-family: DINPro;
          font-weight: 400;
          color: #ffffff;
          opacity: 0.8;
          height: 17px;
          line-height: 10px;
        }
        .spanName {
          border-bottom: 1px dashed rgba(240, 185, 11, 0.3);
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
              height: 15px;
              margin: 0 5px 0 0;
            }
          }
        }
      }
      li:last-child {
        margin: 0;
      }
    }
  }
  .bottom-card-mask {
    background: rgba(38, 34, 34, 0.6);
    border: 1px solid #312d2d;
  }
}
</style>