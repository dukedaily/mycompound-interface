<template>
  <div class="assets">
    <div v-for="(item, index) in cardLists"
         :key="index"
         class="item">
      <span class="title">{{item.name}}</span>
      <div class="count-wrap">
        <span class="count"><i v-if="index !== 2">$</i>{{item.count}} <span v-if="index === 2">PUB</span> </span>
        <button v-if="index === 2">Claim</button>
      </div>
      <img :src="item.cardImg"
           :class="index === 0 ? 'left-img': index === 1 ? 'mid-img' : 'right-img'"
           alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cardLists: [
        {
          name: 'Total Collateral',
          count: '100.23',
          cardImg: require('img/card-cash.png')
        },
        {
          name: 'Total Borrow',
          count: '100.23',
          cardImg: require('img/card-reverage.png')
        },
        {
          name: 'Claimable',
          count: '100.232343',
          cardImg: require('img/card-rewards.png')
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.assets {
  width: 1200px;
  display: flex;
  margin-top: 121px;
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 384px;
    height: 140px;
    background: linear-gradient(90deg, #3d3737, #2e2a2a);
    border: 1px solid #3a3636;
    box-shadow: 0px 1px 12px 0px #130f08;
    border-radius: 6px;
    padding: 44px 30px;
    position: relative;
    .left-img {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 50px;
    }
    .mid-img {
      width: 80px;
      height: 80px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 50px;
    }
    .right-img {
      width: 72px;
      height: 75px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
    .title {
      font-size: 14px;
      font-family: DINPro;
      font-weight: 500;
      color: #999999;
    }
    .count-wrap {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .count {
        font-size: 22px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
      button {
        margin-left: 20px;
        width: 74px;
        height: 24px;
        background: rgba(6, 38, 60, 0);
        border: 1px solid #f4c51d;
        border-radius: 12px;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
      }
      button:hover {
        background-color: #f4c51d;
      }
    }
  }
  .item:not(:first-child) {
    margin-left: 24px;
  }
}
</style>