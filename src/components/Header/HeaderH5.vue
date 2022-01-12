<template>
  <div>
    <div class="head-h5">
      <img class="logo"
           :src="logoImg"
           alt="">
      <div class="head-right">
        <CustomButton type="circle"
                      title="Connect"
                      v-if="!isConnect"
                      @click="connectWallet" />
        <div class="address-show"
             v-if="isConnect">
          <div class="network">
            <div class="circle-point">
              <div class="circle-inner"></div>
            </div>
            <span>{{networkName}}</span>
          </div>
          <CustomButton type="circle"
                        class="address-btn"
                        v-if="isConnect"
                        :title="showAccount" />
        </div>
        <img class="extends"
             :src="extendsImg"
             @click="handleExtendsClick"
             alt="">
      </div>

    </div>
    <DrawLayout :isDrawShow="isDrawShow"
                @maskClick="handleMaskClick" />
  </div>

</template>

<script>
import DrawLayout from './DrawLayout.vue'
import { mapState } from 'vuex'
export default {
  components: {
    DrawLayout
  },
  data () {
    return {
      logoImg: require('img/logo.png'),
      extendsImg: require('img/extends.png'),
      isDrawShow: false
    }
  },
  computed: {
    ...mapState({
      isConnect: state => state.isConnect,
      showAccount: state => state.showAccount,
      networkName: state => state.networkName
    })
  },
  methods: {
    /**
     * 点击展开抽屉
     */
    handleExtendsClick () {
      this.isDrawShow = true
    },
    /**
     * 点击遮罩
     */
    handleMaskClick () {
      this.isDrawShow = false
    },
    /**
     * 连接钱包
     */
    connectWallet () {
      this.$store.dispatch('connetWallet')
    }
  }
}
</script>

<style lang="less" scoped>
.head-h5 {
  width: 100%;
  height: 67px;
  position: fixed;
  top: 0;
  left: 0;
  background: #131313;
  box-shadow: 0px 0px 1px 0px #4f4f4f inset;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  .logo {
    width: 100px;
  }
  .head-right {
    display: flex;
    align-items: center;
    .address-show {
      height: 35px;
      background: #2e2e2e;
      border: 1px solid #3f3f3f;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .network {
        display: flex;
        align-items: center;
        padding: 0 5px;
        .circle-point {
          width: 6px;
          height: 6px;
          background: #4c4c4c;
          border-radius: 50%;
          position: relative;
          z-index: 1;
          .circle-inner {
            width: 4px;
            height: 4px;
            background: #f0b90b;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
          }
        }
        & > span {
          margin-left: 5px;
          font-size: 12px;
          font-family: DINPro;
          font-weight: 500;
          color: #ffffff;
        }
      }
      & > span {
        font-size: 12px;
        font-family: DINPro;
        font-weight: 500;
        color: #ffffff;
      }
      .address-btn {
        width: 90px;
        height: 33px;
      }
    }
    .connect {
      width: 83px;
      height: 35px;
      background: linear-gradient(0deg, #f8d12f, #f0b90b);
      border-radius: 18px;
      line-height: 35px;
      text-align: center;
      font-size: 14px;
      font-family: DINPro;
      font-weight: 500;
      color: #1a1818;
    }
    .extends {
      width: 20px;
      margin-left: 15px;
    }
  }
}
</style>