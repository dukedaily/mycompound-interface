<template>
  <div class="lists">
    <div class="title-wrap">
      <div class="title title-left">Time</div>
      <div class="title title-mid">Activity</div>
      <div class="title title-right">Action</div>
    </div>
    <div class="content">
      <div class="content-item"
           v-for="(item, index) in lists"
           :key="index">
        <div class="item-left">
          <img :src="item.coinImg"
               alt="">
          <div class="left-right">
            <span>{{item.coinName}}</span>
            <span>{{item.time}}</span>
          </div>
        </div>
        <div class="item-mid">
          <div class="mid-top">
            <span>{{item.dealCount}}</span>
            <span style="margin-left: 4px;">{{item.coinName}}</span>
          </div>
          <div class="mid-bottom">{{item.marketName}}</div>
        </div>
        <div class="item-right">
          <img :src="item.coinImg"
               alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lists: [
        {
          coinImg: require('img/usdt.png'),
          coinName: 'USDT',
          time: '2021.05.06 17:16',
          dealCount: 300,
          marketName: 'Market Supply'
        },
        {
          coinImg: require('img/usdt.png'),
          coinName: 'USDT',
          time: '2021.05.06 17:16',
          dealCount: 300,
          marketName: 'Market Supply'
        },
        {
          coinImg: require('img/usdt.png'),
          coinName: 'USDT',
          time: '2021.05.06 17:16',
          dealCount: 300,
          marketName: 'Market Supply'
        },
        {
          coinImg: require('img/usdt.png'),
          coinName: 'USDT',
          time: '2021.05.06 17:16',
          dealCount: 300,
          marketName: 'Market Supply'
        },
        {
          coinImg: require('img/usdt.png'),
          coinName: 'USDT',
          time: '2021.05.06 17:16',
          dealCount: 300,
          marketName: 'Market Supply'
        },
        {
          coinImg: require('img/usdt.png'),
          coinName: 'USDT',
          time: '2021.05.06 17:16',
          dealCount: 300,
          marketName: 'Market Supply'
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.lists {
  margin-top: 28px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #343437;
  border-radius: 10px;
  .title-wrap {
    width: 100%;
    height: 49px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #2a2a2d;
    .title {
      text-align: left;
      font-size: 14px;
      font-family: DINPro;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.4);
    }
    .title-left {
      width: 260px;
    }
    .title-mid {
      width: 280px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    .content-item {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #2a2a2d;
      .item-left {
        width: 260px;
        display: flex;
        & > img {
          width: 30px;
          height: 30px;
        }
        .left-right {
          height: 30px;
          margin-left: 6px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
      .item-mid {
        width: 280px;
        display: flex;
        flex-direction: column;
        height: 30px;
        justify-content: space-between;
        .mid-top {
          font-size: 16px;
          font-family: DINPro;
          font-weight: 500;
          color: #ffffff;
        }
        .mid-bottom {
          font-size: 14px;
          font-family: DINPro;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}
</style>