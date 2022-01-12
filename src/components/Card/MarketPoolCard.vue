<template>
  <div class="market-pool">
    <div class="content-top">
      <div class="market-size">
        Margin Pool
      </div>
      <div class="market-num">10x leverage for wealth</div>
    </div>
    <div class="content-center">
      All active pools
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.market-pool {
  width: 1200px;
  margin-top: 148px;
  .content-top {
    width: 100%;
    height: 240px;
    background: #181819;
    box-shadow: -1px 12px 12px 0px rgba(10, 10, 7, 0.17);
    border-radius: 12px;
    .market-size {
      padding-top: 79px;
      width: 100%;
      text-align: center;
      font-size: 39px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
    .market-num {
      width: 100%;
      margin-top: 32px;
      font-size: 16px;
      font-family: DINPro;
      font-weight: 500;
      color: #f0b90b;
      text-align: center;
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
}
</style>