<template>
  <div>
    <div class="mask"
         @click.self="handleMaskClick"
         v-if="isDrawShow"></div>
    <transition name="slide">
      <div class="draw-layout"
           v-if="isDrawShow">
        <img :src="logoImg"
             alt="">
        <ul>
          <li v-for="(item, index) in navLists"
              :key="index"
              @touchstart="handleItmeTouchStart(item)"
              @touchend="handleItemTouchEnd(item)">
            <img :src="item.isActived ? item.navActiveImg : item.navDefaultImg"
                 alt="">
            <span :style="{opacity: item.isActived ? '1' : ''}">{{item.navName}}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isDrawShow: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      logoImg: require('img/logo.png'),
      navLists: [
        {
          navDefaultImg: require('img/nav_market_default.png'),
          navActiveImg: require('img/nav_market_active.png'),
          isActived: false,
          navName: 'Market'
        },
        {
          navDefaultImg: require('img/nav_swap_default.png'),
          navActiveImg: require('img/nav_swap_active.png'),
          isActived: false,
          navName: 'Margin Swap'
        },
        {
          navDefaultImg: require('img/nav_pool_default.png'),
          navActiveImg: require('img/nav_pool_active.png'),
          isActived: false,
          navName: 'Market Pool'
        },
        {
          navDefaultImg: require('img/nav_asset_default.png'),
          navActiveImg: require('img/nav_asset_active.png'),
          isActived: false,
          navName: 'Asset'
        },
        {
          navDefaultImg: require('img/nav_docs_default.png'),
          navActiveImg: require('img/nav_docs_active.png'),
          isActived: false,
          navName: 'Doc'
        },
      ]
    }
  },
  methods: {
    /**
     * 点击遮罩
     */
    handleMaskClick () {
      this.$emit('maskClick')
    },
    /**
     * 手指按下
     */
    handleItmeTouchStart (item) {
      item.isActived = true
    },
    /**
     * 手指松开
     */
    handleItemTouchEnd (item) {
      item.isActived = false
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/transition.less";
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 200;
}
.draw-layout {
  position: fixed;
  right: 0;
  top: 0;
  width: 176px;
  height: 100%;
  background: #1e1e1e;
  z-index: 201;
  padding: 22px 10px 22px 35px;
  display: flex;
  flex-direction: column;
  & > img {
    width: 105px;
  }
  ul {
    display: flex;
    flex-direction: column;
    li:first-child {
      margin-top: 48px;
    }
    li {
      margin-top: 33px;
      display: flex;
      align-items: center;
      & > img {
        width: 15px;
        height: 15px;
      }
      & > span {
        margin-left: 16px;
        font-size: 16px;
        font-family: DINPro;
        font-weight: 400;
        color: #ffffff;
        opacity: 0.4;
      }
    }
  }
}
</style>