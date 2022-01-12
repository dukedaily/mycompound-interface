<template>
  <div>
    <HeaderPc v-if="!isMobile" />
    <HeaderH5 v-if="isMobile" />
  </div>
</template>

<script>
import HeaderPc from './HeaderPc.vue'
import HeaderH5 from './HeaderH5.vue'
import { mapState } from 'vuex'
export default {
  components: {
    HeaderPc,
    HeaderH5
  },
  computed: {
    ...mapState({
      isMobile: state => state.isMobile
    })
  }
}
</script>

<style>
</style>