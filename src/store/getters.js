const getters = {
  chainId: state => state.chainId,
  network: state => state.network,
  swapLeverageSlideValue: state => state.swap.swapLeverageSlideValue
};

export default getters;