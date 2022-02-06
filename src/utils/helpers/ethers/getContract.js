import { ethers } from 'ethers';

const dwitterAddress = "0x223eD313eeD92238C68Ac627cF6c821ae914d844";
import dwitterAbi from '../../../../solidity/artifacts/contracts/Dwitter.sol/Dwitter.json'

const dwittosAddress = "0x176D3180DA41e728Fe1d30713Dae2a88Fb66D8C5";
import dwittosAbi from '../../../../solidity/artifacts/contracts/Dwittos.sol/Dwittos.json'

export default function getContract(ethereum, name) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    if (name === 'Dwitter') return new ethers.Contract(dwitterAddress, dwitterAbi.abi, signer);
    else if (name === 'Dwittos') return new ethers.Contract(dwittosAddress, dwittosAbi.abi, signer);
  } else {
    console.error(`Function getContract : Ethereum is ${ethereum}`)
    return undefined
  }

}