import { ethers } from 'ethers';

import abi from '../../../../solidity/artifacts/contracts/Dwitter.sol/Dwitter.json'
const address = "0x19A5801aA4C62ae28C617bFeE6d28639D0ae047f";

export default function getContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, abi.abi, signer);
  } else {
    return undefined
  }

}