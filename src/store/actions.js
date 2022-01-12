import { Message } from "element-ui";
import types from 'types'
import { ethers } from "ethers";
import { getShowAddress, sendRequest } from 'utils/index'

const actions = {
  /**
   * 检测当前网络
   */
  async checkNetwork ({ commit }) {
    if (!window.ethereum) {
      Message({ message: '未检测到钱包', type: 'error' })
      return
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.getNetwork().then(Network => {
      commit(types.NETWORK_NAME, Network.name)
      commit(types.CHAINID, Network.chainId) // 获取当前链 ID
      if (Network.chainId != process.env.VUE_APP_KOVAN_CHAINID) {
        Message({ message: `请确保已连接ETH正式网络`, type: 'error' })
        commit(types.NETWORK, false)
      } else {
        commit(types.NETWORK, true)
      }
    })
  },
  /**
   * 连接钱包
   */
  connetWallet ({ commit }) {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(res => {
        commit(types.ACCOUNT, res[0])
        commit(types.SHOW_ACCOUNT, getShowAddress(res[0]))
      })
    } else {
      commit(types.ACCOUNT, '')
      window.open('https://metamask.io/', '_self')
    }
  },
  /**
   * 初始化账户
   */
  initAccount ({ commit }) {
    let param = {
      'method': 'eth_accounts'
    }
    sendRequest(param, function (err, res) {
      if (res.result && res.result.length) {
        commit(types.ACCOUNT, res.result[0])
        commit(types.SHOW_ACCOUNT, getShowAddress(res.result[0]))
        commit(types.IS_CONNECT, true)
      } else {
        commit(types.ACCOUNT, '')
      }
    })
  },
  /**
   * 切换账户之后的回调
   */
  accountChanged ({ commit, state }) {
    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
        window.location.reload()
      } else if (accounts[0] !== state.account) {
        commit(types.ACCOUNT, accounts[0])
        window.location.reload()
      }
    });
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  },
};

export default actions;