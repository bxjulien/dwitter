import { ethers } from 'ethers';

const dwitterAddress = "0x08E0327a417519b0D78f0BC3F3645fD7b6beCA80";
import dwitterAbi from '../../../../solidity/artifacts/contracts/Dwitter.sol/Dwitter.json'

const dwittosAddress = "0x721463A1Ee001E555F17E22c6437E90a62583491";
import dwittosAbi from '../../../../solidity/artifacts/contracts/Dwittos.sol/Dwittos.json';

const faucetAddress = "0x08E0327a417519b0D78f0BC3F3645fD7b6beCA80";
import faucetAbi from '../../../../solidity/artifacts/contracts/Faucet.sol/Faucet.json';
import { ContractTypes } from '../../enums/ContractTypes';

export default function getContract(ethereum, name) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();

    switch (name) {
      case ContractTypes.Dwitter:
        return new ethers.Contract(dwitterAddress, dwitterAbi.abi, signer);
      case ContractTypes.Dwittos:
        return new ethers.Contract(dwittosAddress, dwittosAbi.abi, signer);
      case ContractTypes.Faucet:
        return new ethers.Contract(faucetAddress, faucetAbi.abi, signer);
    }
  } else {
    console.error(`Function getContract : Ethereum is ${ethereum}`)
    return undefined
  }

}