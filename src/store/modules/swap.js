/**
 * 杠杆交易页面状态管理
 */
import types from '../types'

const state = {
  swapLeverageSlideValue: 3, // 杠杆交易杠杆倍数
  marginSwapLists: [], // 杠杆交易持仓列表
  marginSwapIndex: 0, // 点击的 swaplist 列表 index
  tokenName: 'UNI', // 下拉选择的币种名称
  decimals: '18', // 币种精度
  tokenAddress: '0x075a36ba8846c6b6f53644fdd3bf17e5151789dc', // 下拉选择的币种合约地址
  pTokenAddress: '0x28153df80ea23839f8f89019dd17ea25950662e2', // 对应的 pToken 地址
  coinBalance: '', // 下拉选择的币种余额
}

// 定义 getters
const getters = {

}

// 定义 mutations
const mutations = {
  [types.SWAP_LEVERAGE_SLIDE_VALUE] (state, data) {
    state.swapLeverageSlideValue = data
  },
  [types.SWAP_LISTS] (state, data) {
    state.marginSwapLists = data
  },
  [types.SWAP_INDEX] (state, data) {
    state.marginSwapIndex = data
  },
  [types.SWAP_TOKEN_NAME] (state, data) {
    state.tokenName = data
  },
  [types.SWAP_TOKEN_ADDRESS] (state, data) {
    state.tokenAddress = data
  },
  [types.COIN_BALANCE] (state, data) {
    state.coinBalance = data
  },
  [types.SWAP_P_TOKEN_ADDRESS] (state, data) {
    state.pTokenAddress = data
  },
  [types.SWAP_DECIMAL] (state, data) {
    state.decimals = data
  }
}

// 定义 actions
const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}