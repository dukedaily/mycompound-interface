<template>
  <div class="select-option">
    <ul>
      <li v-for="(item, index) in coinList"
          :key="index">
        <img :src="item.imgUrl"
             alt="">
        <span class="coin">{{item.coinName}}</span>
        <span class="percent">{{item.percent}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      coinList: [
        {
          imgUrl: require('img/usdc.png'),
          coinName: 'USDC',
          percent: '9.34 %'
        },
        {
          imgUrl: require('img/usdt.png'),
          coinName: 'USDT',
          percent: '9.34 %'
        },
        {
          imgUrl: require('img/usdt.png'),
          coinName: 'USDT',
          percent: '9.34 %'
        },
        {
          imgUrl: require('img/usdc.png'),
          coinName: 'USDC',
          percent: '9.34 %'
        },
        {
          imgUrl: require('img/usdt.png'),
          coinName: 'USDT',
          percent: '9.34 %'
        },
        {
          imgUrl: require('img/usdt.png'),
          coinName: 'USDT',
          percent: '9.34 %'
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.select-option {
  position: absolute;
  width: 172px;
  height: 132px;
  right: 0;
  top: 74px;
  background: #636060;
  border: 1px solid #736e6e;
  border-radius: 6px;
  z-index: 110;
  overflow: auto;
  ul {
    display: flex;
    flex-direction: column;
    li {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      padding-left: 17px;
      border-bottom: 1px solid #6c6c6c;
      img {
        width: 28px;
        height: 28px;
      }
      .coin {
        margin-left: 7px;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
      .percent {
        margin-left: 10px;
        font-size: 12px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        line-height: 2px;
      }
    }
  }
}
</style>