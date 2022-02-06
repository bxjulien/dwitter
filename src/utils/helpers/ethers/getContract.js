import { ethers } from 'ethers';

const dwitterAddress = "0xBEF72156C30f7979cb1484C64273Fc173199d7e8";
import dwitterAbi from '../../../../solidity/artifacts/contracts/Dwitter.sol/Dwitter.json'

const dwittosAddress = "0xeA37424532037200C31a2132E732CDeff09bd441";
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