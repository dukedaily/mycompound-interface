/**
 * 列表按钮点击弹窗
 */
export const dialogType = {
  SWAP_REPAY: 0, // 资产管理页面杠杆交易repay弹窗
  SWAP_CLOSE: 1, // 资产管理页面杠杆交易 close 弹窗
  SWAP_SUPPLY: 2, // 
  MARKET_SUPPLY: 3, // market 页面Supply弹窗
  DEPOSITS_SUPPLY: 4, // 资产管理页面Supply弹窗
  DEPOSITS_WITHDRAW: 5, // 资产管理页面Withdraw弹窗
  ASSET_POOL_REPAY: 6, // 资产管理页面Repay弹窗
  ASSET_POOL_HARVEST: 7, // 资产管理页面Harvest弹窗
  ASSET_POOL_REMOVE: 8, // 资产管理页面Remove弹窗
  MARKET_POOL_FARM: 9, // 杠杆挖矿farm弹窗
}

/**
 * 钱包交互弹窗
 */
export const walletDialogType = {
  WALLET_CONNECT: 0, // 连接钱包弹窗
  WALLET_ACCOUNT: 1, // 账户弹窗
  WALLET_HISTORY: 2, // 历史记录
}

export default {
  dialogType,
  walletDialogType
}