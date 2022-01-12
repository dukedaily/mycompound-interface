/**
 * 资产管理页面状态管理
 */
import types from '../types'
import { request, gql } from 'graphql-request'

const state = {
  depositsItemIndex: 0, // 资产管理列表点击角标
  depositsLists: [], // 资产管理我的借款列表数据
}

// 定义 getters
const getters = {

}

// 定义 mutations
const mutations = {
  // 管理点击的资产管理列表 item 角标值
  [types.ASSETS_LISTS] (state, data) {//资产管理列表数组
    state.depositsLists = data
  },
  // 设置/修改资产管理列表数据
  [types.ASSETS_ITEM_INDEX] (state, data) { //资产管理当前下角标
    state.depositsItemIndex = data
  }
}

// 定义 actions
const actions = {
  // 获取资产管理我的存款列表
  async getAssetsLists (context, args) {
    const endpoint = process.env.VUE_APP_MARKET_LIST_URL
    const query = gql`{      
          accountPTokens(where: {account: "${args}"}) {
            id
            symbol
            accrualBlockNumber
            totalUnderlyingSupplied
            totalUnderlyingRedeemed
            totalUnderlyingBorrowed
            totalUnderlyingRepaid
            accountBorrowIndex
            storedBorrowBalance
            pTokenBalance
            market {
              id
              exchangeRate
              underlyingAddress
              underlyingName
              underlyingSymbol
              underlyingDecimals
              supplyRate
              distributionSupplyRate
            }
          }
      }`
    try {
      const res = await request(endpoint, query)
      context.commit(types.ASSETS_LISTS, res)
      return res
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}