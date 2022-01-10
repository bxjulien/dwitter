import { ethers } from 'ethers';

import abi from '../../../artifacts/contracts/Dwitter.sol/Dwitter.json'
const address = "0x2DC358BA82609A864fcb358B33555802e528abF7";

export default function getContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, abi.abi, signer);
  } else {
    return undefined
  }

}