import { ethers } from 'ethers';

import abi from '../../../artifacts/contracts/Dwitter.sol/Dwitter.json'
const address = "0xC4fe37348CE23f9Db147359735a06b5F6aEaAce6";

export default function getContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, abi.abi, signer);
  } else {
    return undefined
  }

}