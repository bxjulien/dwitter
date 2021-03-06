import { useState, useEffect, createContext, useContext } from "react";

const MetamaskContext = createContext();

export default function MetamaskProvider({ children }) {
  const [ethereum, setEthereum] = useState(null);
  const [account, setAccount] = useState(null)

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
  useEffect(() => setEthereumFromWindow(), []);

  async function getAccount() {
    if (ethereum) {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      handleAccounts(accounts);
    }
  }
  useEffect(() => getAccount());

  function handleAccounts(accounts) {
    if (accounts.length > 0) {
      const account = accounts[0];
      setAccount(account);
    } else {
      alert("No authorized account :(")
    }
  };

  const value = { ethereum, account, getAccount }

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  )
}

export function useMetamask() {
  return useContext(MetamaskContext);
}
