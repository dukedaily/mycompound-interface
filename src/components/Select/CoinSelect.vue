<template>
  <div class="coin-select">
    <ul>
      <li v-for="(item, index) in tokenLists"
          :key="index"
          @click.stop="handleItemClick(item)">
        <img :src="getImg(item.token)"
             alt="">
        <span class="coin">{{item.symbol}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { tokenLists } from 'mock/token-list.js'
import { getCoinImg } from 'utils/index.js'
import types from 'types'
export default {
  data () {
    return {
      tokenLists: []
    }
  },
  mounted () {
    // 获取 token 列表
    this.getTokenLists()
  },
  methods: {
    /**
     * 根据 token 地址获取币种图标
     */
    getImg (address) {
      return getCoinImg(address)
    },
    /**
     * 获取 token 列表
     */
    getTokenLists () {
      this.tokenLists = tokenLists
    },
    /**
     * 列表 item 点击
     */
    handleItemClick (item) {
      this.$store.commit(types.SWAP_TOKEN_NAME, item.symbol)
      this.$store.commit(types.SWAP_TOKEN_ADDRESS, item.token)
      this.$store.commit(types.SWAP_P_TOKEN_ADDRESS, item.pToken)
      this.$store.commit(types.SWAP_DECIMAL, item.decimals)
      this.$store.commit(types.INPUT_VALUE, '')
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.coin-select {
  position: absolute;
  width: 150px;
  height: 130px;
  right: 0;
  top: 100px;
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
      background: #636060;
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
    }
    li:hover {
      background: #494545;
    }
  }
}
</style>