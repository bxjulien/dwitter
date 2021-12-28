import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Dwitter from '../artifacts/contracts/Dwitter.sol/Dwitter.json'

const dweeterAddress = "0xe32412ed42Fd10bB8b6fd3D219103Fe904d1E8B0";

export default function Home() {
  const [dweets, setDweets] = useState([]);

  useEffect(() => {
    getDweets();
  }, [])

  async function getDweets() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(dweeterAddress, Dwitter.abi, provider)

      try {
        setDweets(await contract.getAllDweets())
        console.log(dweets)
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <h1>Home</h1>
  )
}
