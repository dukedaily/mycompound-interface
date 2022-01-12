<template>
  <div class="assets-container">
    <AssetsCard />
    <DepositsLists />
    <SwapLists />
    <PoolLists />
    <transition name="el-fade-in-linear">
      <RepayDialog v-if="dialogType === 0" />
    </transition>
    <transition name="el-fade-in-linear">
      <SwapCloseDialog v-if="dialogType === 1" />
    </transition>
    <transition name="el-fade-in-linear">
      <SwapSupplyDialog v-if="dialogType === 2" />
    </transition>
    <transition name="el-fade-in-linear">
      <DepositsSupplyDialog v-if="dialogType === 4" />
    </transition>
    <transition name="el-fade-in-linear">
      <WithdrawDialog v-if="dialogType === 5" />
    </transition>
    <RepayDialog v-if="dialogType === 6" />
    <HarvestDialog v-if="dialogType === 7" />
    <PoolRemove v-if="dialogType === 8" />
  </div>
</template>

<script>
import AssetsCard from 'comp/Card/AssetsCard.vue'
import DepositsLists from 'comp/Lists/DepositsLists.vue'
import PoolLists from 'comp/Lists/PoolLists.vue'
import SwapLists from 'comp/Lists/SwapLists.vue'
import RepayDialog from 'comp/Dialog/RepayDialog.vue'
import SwapCloseDialog from 'comp/Dialog/SwapCloseDialog.vue'
import SwapSupplyDialog from 'comp/Dialog/SwapSupplyDialog.vue'
import DepositsSupplyDialog from 'comp/Dialog/DepositsSupplyDialog.vue'
import WithdrawDialog from 'comp/Dialog/WithdrawDialog.vue'
import HarvestDialog from 'comp/Dialog/HarvestDialog.vue'
import PoolRemove from 'comp/Dialog/PoolRemove.vue'
import { mapState } from 'vuex'
export default {
  components: {
    AssetsCard,
    DepositsLists,
    PoolLists,
    SwapLists,
    RepayDialog,
    SwapCloseDialog,
    SwapSupplyDialog,
    DepositsSupplyDialog,
    WithdrawDialog,
    HarvestDialog,
    PoolRemove
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      dialogType: state => state.dialogType
    })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/transition.less";
.assets-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #181a1e;
  padding-bottom: 56px;
}
</style>