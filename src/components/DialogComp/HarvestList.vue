<template>
  <div class="harvest-list">
    <p>{{titleName}}</p>
    <div class="list-content"
         v-for="(item, index) in harvestList"
         :key="index">
      <div class="content-left">
        <img :src="item.coinImg"
             alt="">
        <span>{{item.coinName}}</span>
      </div>
      <div class="content-right">
        <span>{{item.coinValue}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      require: true
    },
    harvestList: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      usdtImg: require('img/usdt.png'),
      rightImg: require('img/icon-right.png')
    }
  }
}
</script>

<style lang="less" scoped>
.harvest-list {
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
  .list-content {
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
      }
    }
    .content-right {
      display: flex;
      align-items: center;
      & > span {
        font-size: 12px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
}
</style>