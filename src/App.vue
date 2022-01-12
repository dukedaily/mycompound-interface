<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <WalletDialog v-if="type === 0" />
    <AccountDialog v-if="type === 1" />
    <HistoryDialog v-if="type === 2" />
  </div>
</template>

<script>
import WalletDialog from 'comp/WalletDialog/WalletDialog.vue'
import AccountDialog from 'comp/WalletDialog/AccountDialog.vue'
import HistoryDialog from 'comp/WalletDialog/HistoryDialog.vue'
import Cookies from 'js-cookie';
import Header from 'comp/Header/index.vue'
import { checkIsMobile } from 'utils/index'
import { mapState } from 'vuex'
import types from 'types'
export default {
  name: 'App',
  components: {
    Header,
    WalletDialog,
    AccountDialog,
    HistoryDialog
  },
  async mounted () {
    this.isMobile() // 是否是移动端
    await this.$store.dispatch('checkNetwork') // 检测网路
    this.$store.dispatch('initAccount') // 初始化账户
    this.initLanguage(); // 初始化语言
    this.$store.dispatch('accountChanged') // 监听账号改变
  },
  computed: {
    ...mapState({
      type: state => state.walletDialogType
    })
  },
  methods: {
    /**
     * 判断是否是移动端
     */
    isMobile () {
      this.$store.commit(types.IS_MOBILE, checkIsMobile())
      return checkIsMobile()
    },
    /**
     * 初始化语言环境
     */
    initLanguage () {
      if (Cookies.get('lang') === 'ZH') {
        this.$i18n.locale = 'zh';
        Cookies.set('lang', 'ZH', { 'domain': `${process.env.VUE_APP_DOMAIN}` });
      } else { // 默认显示英文
        this.$i18n.locale = 'en';
        Cookies.set('lang', 'EN', { 'domain': `${process.env.VUE_APP_DOMAIN}` });
      }
    }
  }
};
</script>

<style lang="less">
@import "./assets/style/global.css";
@import "./assets/style/common.css";
#app {
  width: 100%;
  height: 100%;
  background-color: #111111;
}
</style>
