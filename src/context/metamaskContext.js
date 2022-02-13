import { useState, useEffect, createContext, useContext } from "react";
import { ContractTypes } from "../utils/enums/ContractTypes";
import getContract from "../utils/helpers/ethers/getContract";

const MetamaskContext = createContext();

export default function MetamaskProvider({ children }) {
  const [ethereum, setEthereum] = useState(null);
  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState(null);
  const [isMetamaskContextLoaded, setIsMetamaskContextLoaded] = useState(false);

  useEffect(() => setEthereumFromWindow(), []);
  useEffect(() => {
    if (ethereum) {
      getAccount();
      setContracts({
        dwitter: getContract(ethereum, ContractTypes.Dwitter),
        dwittos: getContract(ethereum, ContractTypes.Dwittos),
        faucet: getContract(ethereum, ContractTypes.Faucet),
      })
    }
  }, [ethereum]);
  
  async function setEthereumFromWindow() {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload())
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const rinkebyId = "0x4";
      if (chainId == rinkebyId) {
        setEthereum(window.ethereum);
      } else {
        alert("Wrong Network... Use Rinkeby Testnet :)")
      }
    }
  }

  async function getAccount() {
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      handleAccounts(accounts);
      setIsMetamaskContextLoaded(true)
    }
  }

  function handleAccounts(accounts) {
    if (accounts.length > 0) {
      const account = accounts[0];
      setAccount(account);
    } else {
      console.error("No authorized account :(");
    }
  };

  const value = { ethereum, account, getAccount, contracts, isMetamaskContextLoaded }

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  )
}

export function useMetamask() {
  return useContext(MetamaskContext);
}
