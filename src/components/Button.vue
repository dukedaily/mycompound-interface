<template>
  <div>
    <el-button v-waves
               :class="disabled ? 'disabled' : 'theme-btn'"
               v-if="type === 'primary'"
               :loading="loading"
               :disabled="disabled"
               @click="handleClick">{{title}}</el-button>
    <el-button v-waves
               class="circle-btn"
               v-if="type === 'circle'"
               :loading="loading"
               :disabled="disabled"
               @click="handleClick">{{title}}</el-button>
    <el-button v-waves
               class="border-btn"
               v-if="type === 'border'"
               :loading="loading"
               @click="handleClick">{{title}}</el-button>
    <el-button v-waves
               class="plain-btn"
               v-if="type === 'plain'"
               :loading="loading"
               @click="handleClick">{{title}}</el-button>
  </div>
</template>

<script>
import waves from '@/directive/waves'
export default {
  directives: { waves },
  props: {
    type: {
      type: String,
      require: true
    },
    title: {
      type: String,
      require: true
    },
    loading: {
      type: Boolean,
      require: false
    },
    disabled: {
      type: Boolean,
      require: false
    }
  },
  methods: {
    /**
     * theme按钮点击
     */
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/style/dialog.less";
</style>