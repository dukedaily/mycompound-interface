<template>
  <div class="close">
    <img :src="closeImg"
         @click="handleDialogDismiss"
         alt="">
  </div>
</template>

<script>
import types from 'types'
export default {
  data () {
    return {
      closeImg: require('img/dialog-close.png'),
    }
  },
  methods: {
    /**
     * 关闭弹窗
     */
    handleDialogDismiss () {
      this.$store.commit(types.WALLET_DIALOG_TYPE, '')
    }
  }
}
</script>

<style lang="less" scoped>
.close {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: -90px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
</style>