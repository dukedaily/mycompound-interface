<template>
  <div class="receive-coin">
    <div class="receive-title">
      <span>{{title}}</span>
      <div class="title-right">
        <span style="margin-right: 4px;">Available</span>
        <span>100</span>
        <span>USDT</span>
        <div class="max">MAX</div>
      </div>
    </div>
    <div class="receive-content">
      <div class="content-top">
        <div class="top-left">
          <img :src="usdtImg"
               alt="">
          <span>WETH</span>
          <span style="margin: 0 4px;">/</span>
          <span>USDTLP</span>
        </div>
        <span>100%</span>

      </div>
      <div class="content-bottom">
        <img :src="darkDownImg"
             alt="">
        <div class="bottom-left">
          <span>receive</span>
          <div>
            <span>≈ $</span>
            <span style="margin-left: 4px">0.00</span>
          </div>
        </div>
        <div class="bottom-mid">
          <img :src="usdtImg"
               alt="">
          <div class="mid-right">
            <div>
              <span>≈ $</span>
              <span style="margin-left: 4px">20.00</span>
            </div>
            <span>USDT</span>
          </div>
        </div>
        <div class="bottom-right">
          <img :src="usdtImg"
               style="opacity: 0.6"
               alt="">
          <div class="mid-right">
            <div>
              <span>20.00</span>
            </div>
            <span>USDT</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: false,
      default: 'Close'
    }
  },
  data () {
    return {
      usdtImg: require('img/usdt.png'),
      darkDownImg: require('img/dark-down.png')
    }
  }
}
</script>

<style lang="less" scoped>
.receive-coin {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  .receive-title {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 14px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
      opacity: 0.6;
    }
    .title-right {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
        opacity: 0.4;
      }
      .max {
        margin-left: 10px;
        width: 50px;
        height: 22px;
        background: #3c3521;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-family: DINPro;
        font-weight: 500;
        color: #f0b90b;
        cursor: pointer;
      }
    }
  }
  .receive-content {
    width: 100%;
    border-radius: 8px;
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px -1px 6px 0px rgba(19, 15, 8, 0.69);
    .content-top {
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #4a4545;
      padding: 0 48px 0 20px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      .top-left {
        display: flex;
        align-items: center;
        & > img {
          width: 36px;
          height: 36px;
          margin-right: 10px;
        }
        span {
          font-size: 18px;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
        }
      }
      span {
        font-size: 18px;
        font-family: DINPro;
        font-weight: bold;
        color: #ffffff;
      }
    }
    .content-bottom {
      display: flex;
      height: 130px;
      align-items: center;
      justify-content: space-between;
      padding: 0 48px 0 20px;
      background: #3b3636;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      position: relative;
      & > img {
        position: absolute;
        width: 46px;
        height: 46px;
        left: 40px;
        top: 0;
        transform: translateY(-50%);
        z-index: 99;
      }
      .bottom-left {
        display: flex;
        flex-direction: column;
        span {
          font-size: 18px;
          font-family: DINPro;
          font-weight: bold;
          color: #ffffff;
        }
        & > div {
          margin-top: 10px;
          display: flex;
          span {
            font-size: 14px;
            font-family: DINPro;
            font-weight: bold;
            color: #ffffff;
            opacity: 0.4;
          }
        }
      }
      .bottom-mid,
      .bottom-right {
        display: flex;
        & > img {
          width: 42px;
          height: 42px;
          margin-right: 12px;
        }
        .mid-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          div {
            display: flex;
            span {
              font-size: 16px;
              font-family: DINPro;
              font-weight: bold;
              color: #ffffff;
            }
          }
          span {
            font-size: 16px;
            font-family: DINPro;
            font-weight: bold;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>