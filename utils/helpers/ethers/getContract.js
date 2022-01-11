import { ethers } from 'ethers';

import abi from '../../../artifacts/contracts/Dwitter.sol/Dwitter.json'
const address = "0x731A3Ba95d302341f58d2bEbDe0D3c1D30b897dc";

export default function getContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, abi.abi, signer);
  } else {
    return undefined
  }

}