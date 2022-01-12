const states = {
  account: '', // 钱包账户信息
  showAccount: '', // 显示的钱包地址
  chainId: '', // 链ID
  network: '', // 当前网络
  dialogType: '', // 弹窗类型
  walletDialogType: '', // 钱包交互弹窗类型
  inputValue: 0, // 金额输入框双向绑定的值
  price: 0, // 币种价格
  isMobile: false, // 判断是否是移动端
  isConnect: false, // 网络是否已连接
  networkName: '', // 当前网络名称
};

export default states;