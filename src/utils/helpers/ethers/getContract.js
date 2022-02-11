import { ethers } from 'ethers';

const dwitterAddress = "0x223eD313eeD92238C68Ac627cF6c821ae914d844";
import dwitterAbi from '../../../../solidity/artifacts/contracts/Dwitter.sol/Dwitter.json'

const dwittosAddress = "0x176D3180DA41e728Fe1d30713Dae2a88Fb66D8C5";
import dwittosAbi from '../../../../solidity/artifacts/contracts/Dwittos.sol/Dwittos.json';

const faucetAddress = "0x176D3180DA41e728Fe1d30713Dae2a88Fb66D8C5";
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