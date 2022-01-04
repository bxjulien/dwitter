import { ethers } from 'ethers';

export default function getContract(address, abi) {
  const { ethereum } = window;

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, abi, signer);
  } else {
    alert("oupss, Metamask is not installed")
  }

}