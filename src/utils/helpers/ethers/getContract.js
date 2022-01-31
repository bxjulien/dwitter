import { ethers } from 'ethers';

const dwitterAddress = "0xd5b3342fC426a7B0552a853Ab7E9A30440aFe9f8";
import dwitterAbi from '../../../../solidity/artifacts/contracts/Dwitter.sol/Dwitter.json'

const dwittosAddress = "0xDe236EfdDF752d0B5ee910ABe053664E21F54178";
import dwittosAbi from '../../../../solidity/artifacts/contracts/Dwittos.sol/Dwittos.json'

export default function getContract(ethereum, name) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    if (name === 'Dwitter') return new ethers.Contract(dwitterAddress, dwitterAbi.abi, signer);
    else if (name === 'Dwittos') return new ethers.Contract(dwittosAddress, dwittosAbi.abi, signer);
  } else {
    return undefined
  }

}