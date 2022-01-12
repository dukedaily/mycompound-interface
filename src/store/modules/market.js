/**
 * 市场页面状态管理
 */
import types from '../types'

const state = {
  marketItemIndex: 0, // market列表点击角标
  marketLists: [], // 市场列表数据
}

// 定义 getters 
const getters = {

}

// 定义 mutations
const mutations = {
  // 设置/修改市场列表数据
  [types.MARKET_LISTS] (state, data) { //marke 列表数组
    state.marketLists = data
  },
  // 存储点击的市场列表 item 角标值
  [types.MARKET_ITEM_INDEX] (state, data) {
    state.marketItemIndex = data
  }
}

// 定义 actions
const actions = {

}

export default {
  state,
  getters,
  actions,
  mutations
}