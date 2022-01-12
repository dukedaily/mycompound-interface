<template>
  <div class="market-main">
    <MarketSwapH5 v-if="isMobile" />
    <MarketSwapPc v-else />
  </div>
</template>
<script>
import MarketSwapPc from '../MarketSwap/MarketSwapPc'
import MarketSwapH5 from '../MarketSwap/MarketSwapH5'
import { mapState } from 'vuex'
export default {
  components: {
    MarketSwapPc,
    MarketSwapH5
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      isMobile: state => state.isMobile
    })
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.market-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background: #111111;
}
</style>