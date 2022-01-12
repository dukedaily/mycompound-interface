import types from './types'

const mutations = {
  [types.ACCOUNT] (state, data) {
    state.account = data
  },
  [types.CHAINID] (state, data) {
    state.chainId = data;
  },
  [types.NETWORK] (state, data) {
    state.network = data;
  },
  [types.DIALOG_TYPE] (state, data) {
    state.dialogType = data
  },
  [types.WALLET_DIALOG_TYPE] (state, data) {
    state.walletDialogType = data
  },
  [types.INPUT_VALUE] (state, data) {
    state.inputValue = data
  },
  [types.COIN_PRICE] (state, data) {
    state.price = data
  },
  [types.IS_MOBILE] (state, data) {
    state.isMobile = data
  },
  [types.SHOW_ACCOUNT] (state, data) {
    state.showAccount = data
  },
  [types.IS_CONNECT] (state, data) {
    state.isConnect = data
  },
  [types.NETWORK_NAME] (state, data) {
    state.networkName = data
  }
};

export default mutations;