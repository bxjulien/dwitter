export default async function switchNetwork(ethereum) {
  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: '0x4'
        }
      ]
    });
  } catch (e) {
    console.log(e)
  }
};