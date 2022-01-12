<template>
  <div class="head-container">
    <div class="head-left">
      <div class="img"
           @click="handleHomeClick">
        <img :src="logoUrl"
             alt="">
      </div>
      <ul>
        <li v-for="(item, index) in navLists"
            :key="index"
            @click="handleItemClick(index)">
          <a>{{item.name}}</a>
          <div v-if="item.isFocus"
               class="line"></div>
        </li>
      </ul>
    </div>
    <div class="head-right">
      <div v-if="network"
           class="wallet">
        <el-button class="wallet-unconnect"
                   v-if="!walletShow && !isConnected"
                   @click="handleConnectWallet">连接钱包</el-button>
        <div class="wallet-info-wrapper"
             v-if="walletShow || isConnected">
          <div class="wallet-right"
               @click="handleAccountClick">{{ showAccount }}</div>
        </div>
      </div>
      <div class="wallet"
           v-else>
        <el-button class="wallet-unconnect">网络错误</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { walletDialogType } from 'utils/enum.js'
import { mapState } from 'vuex'
import types from 'types'
export default {
  data () {
    return {
      walletShow: false,
      logoUrl: require("img/logo.png"),
      navLists: [
        {
          name: 'Market',
          isFocus: false
        },
        {
          name: 'Margin Swap',
          isFocus: false
        },
        {
          name: 'Margin Pool',
          isFocus: false
        },
        {
          name: 'Asset',
          isFocus: false
        },
        {
          name: 'DOC',
          isFocus: false
        },
      ]
    }
  },
  computed: {
    ...mapState({
      account: state => state.account,
      showAccount: state => state.showAccount,
      isConnected: state => state.isConnect,
      network: state => state.network
    })
  },
  created () {
    setTimeout(() => {
      this.initNav(this.$route.path)
    }, 100)
  },
  watch: {
    $route: {
      handler: function (val) {
        this.navLists.forEach(item => item.isFocus = false)
        this.initNav(val.path)
      },
      deep: true
    }
  },
  methods: {
    /**
     * 初始化导航
     */
    initNav (val) {
      switch (val) {
        case '/market':
          this.navLists[0].isFocus = true
          break
        case '/market/swap':
          this.navLists[1].isFocus = true
          break
        case '/market/pool':
          this.navLists[2].isFocus = true
          break
        case '/asset':
          this.navLists[3].isFocus = true
          break
        case '/doc':
          this.navLists[4].isFocus = true
          break
      }
    },
    /**
     * 点击导航图标链接首页
     */
    handleHomeClick () {
      this.resetNavStatus()
      this.$router.push('/')
    },
    /**
     * 连接钱包
     */
    handleConnectWallet () {
      this.$store.commit(types.WALLET_DIALOG_TYPE, walletDialogType.WALLET_CONNECT)
    },
    /**
     * 重置导航focus状态
     */
    resetNavStatus (idx) {
      this.navLists.forEach((item, index) => {
        item.isFocus = index === idx ? true : false
      })
    },
    /**
     * 导航点击
     */
    handleItemClick (idx) {
      this.resetNavStatus(idx)
      switch (idx) {
        case 0: // Leverage
          if (this.$route.path !== '/market') {
            this.$router.push('/market')
          }
          break
        case 1: // Market
          if (this.$route.path !== '/market/swap') {
            this.$router.push('/market/swap')
          }
          break
        case 2: // DOC
          if (this.$route.path !== '/market/pool') {
            this.$router.push('/market/pool')
          }
          break
        case 3: // DOC
          if (this.$route.path !== '/asset') {
            this.$router.push('/asset')
          }
          break
        case 4: // DOC
          if (this.$route.path !== '/doc') {
            this.$router.push('/doc')
          }
          break
      }
    },
    /**
     * 钱包已连接时点击
     */
    handleAccountClick () {
      this.$store.commit(types.WALLET_DIALOG_TYPE, walletDialogType.WALLET_ACCOUNT)
    }
  }
}
</script>

<style lang="less" scoped>
.head-container {
  position: fixed;
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #131313;
  padding: 0 50px;
  box-shadow: 0px 0px 1px 0px #4f4f4f;
  z-index: 106;
  .head-left {
    display: flex;
    align-items: center;
    height: 100%;
    .img {
      width: 144px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      & > img {
        width: 120px;
        height: 32px;
        cursor: pointer;
      }
    }
    & > ul {
      display: flex;
      align-items: center;
      height: 100%;
      li:first-child {
        margin-left: 50px;
      }
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-width: 70px;
        margin-left: 100px;
        position: relative;
        cursor: pointer;
        & > a {
          height: 10px;
          font-size: 14px;
          font-family: DINPro;
          font-weight: 500;
          color: #f8d12f;
          line-height: 2px;
        }
        .line {
          width: 70px;
          height: 2px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: #f8d12f;
        }
      }
      li:hover {
        opacity: 0.8;
      }
    }
  }
  .head-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .wallet {
      margin-left: auto;
      .el-button {
        color: #fff;
        border: none;
        background: linear-gradient(0deg, #f8d12f, #f0b90b);
        border-radius: 6px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 600;
      }
      .wallet-unconnect:hover {
        opacity: 0.8;
      }
      .wallet-info-wrapper {
        display: flex;
        background: #ffffff;
        padding: 4px 12px;
        align-items: center;
        border-radius: 6px;
        cursor: pointer;
        background: linear-gradient(0deg, #f8d12f, #f0b90b);
        color: #fff;
      }
      .wallet-right {
        display: flex;
        align-items: center;
        font-size: 15px;
        height: 30px;
        font-weight: 600;
      }
      .wallet-right:hover {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        opacity: 0.6;
      }
    }
  }
}
</style>