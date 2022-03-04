import { ethers } from 'ethers';
import { ContractTypes } from '../../enums/ContractTypes';

const dwittosAddress = "0x500c0DFB59c9cd1A8E935c86150A8235e9B3D62A";
import dwittosAbi from '../../../../solidity/artifacts/contracts/Dwittos.sol/Dwittos.json';

const dwitterAddress = "0x7B8A0E8Cf25a4eDE8BC94b79065Cb7987247CAAc";
import dwitterAbi from '../../../../solidity/artifacts/contracts/Dwitter.sol/Dwitter.json'

const faucetAddress = "0x69a1B8e2752fB015A2645d20E7cB29b231807F2f";
import faucetAbi from '../../../../solidity/artifacts/contracts/Faucet.sol/Faucet.json';

export default function getContract(ethereum, contractType, wallet = null) {
  let signer;

  if (!ethereum && !wallet) {
    console.error(`Function getContract : Ethereum is ${ethereum} / Wallet is ${wallet}`)
    return undefined
  }
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
  }

  switch (contractType) {
    case ContractTypes.Dwitter:
      return new ethers.Contract(dwitterAddress, dwitterAbi.abi, signer);
    case ContractTypes.Dwittos:
      return new ethers.Contract(dwittosAddress, dwittosAbi.abi, signer);
    case ContractTypes.Faucet:
      return new ethers.Contract(faucetAddress, faucetAbi.abi, signer ? signer : wallet);
  }
}