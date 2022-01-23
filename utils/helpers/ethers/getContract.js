import { ethers } from 'ethers';

import abi from '../../../artifacts/contracts/Dwitter.sol/Dwitter.json'
const address = "0xadBc73832C106Ba9CA8908Cb4159Da795c5B3aa5";

export default function getContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, abi.abi, signer);
  } else {
    return undefined
  }

}