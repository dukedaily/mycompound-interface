<template>
  <div class="dialog-container"
       @click.stop="">
    <div class="dialog-wrap"
         @click.stop="">
      <DialogHead :titleName="titleName" />
      <HervestList :titleName="childTitleName"
                   :harvestList="harvestList" />
      <div class="btn-wrap">
        <CustomButton type="primary"
                      title="Harvest"
                      class="btn" />
      </div>
      <DialogClose />
    </div>
  </div>
</template>

<script>
import DialogHead from 'comp/DialogComp/DialogHead.vue'
import HervestList from 'comp/DialogComp/HarvestList.vue'
import DialogClose from 'comp/DialogComp/DialogClose.vue'
export default {
  components: {
    DialogHead,
    DialogClose,
    HervestList
  },
  data () {
    return {
      titleName: 'Harvest',
      childTitleName: 'Mining Earnings',
      harvestList: [
        {
          coinImg: require('img/usdt.png'),
          coinName: 'USDT',
          coinValue: '129.34'
        },
        {
          coinImg: require('img/usdc.png'),
          coinName: 'USDC',
          coinValue: '29.87'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/style/dialog.less";
.btn-wrap {
  width: 100%;
  margin-top: 40px;
  padding: 0 40px;
  .btn {
    width: 100%;
    height: 50px;
  }
}
</style>