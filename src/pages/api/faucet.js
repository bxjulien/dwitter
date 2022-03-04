// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ethers } from "ethers";
import { ContractTypes } from "../../utils/enums/ContractTypes";
import getContract from "../../utils/helpers/ethers/getContract";

const ALCHEMY_SECRET = "1f1d85ed6d2d8e9d61b0945d29ca60cc854795b5d924353722e43a969f18d25f";
const ALCHEMY_API_URL = 'https://eth-rinkeby.alchemyapi.io/v2/WpQX6gwjlLtmzY1Ic0YKahkDnBvUHMub';

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  try {
    const { address } = req.body;

    const provider = new ethers.getDefaultProvider(ALCHEMY_API_URL);
    const wallet = new ethers.Wallet(ALCHEMY_SECRET, provider);

    const faucet = getContract(null, ContractTypes.Faucet, wallet);
    
    /* const tx = await faucet.request(address, { gasLimit: 900000 });*/

    faucet.request(address, { gasLimit: 900000 }).then(data => {
      return res.json(data)
    })

    /* return res.status(200).json({ tx }); */
  }
  catch (e) {
    return res.status(500).json({ error: `Transaction failed. error : ${e}` });
  }
}