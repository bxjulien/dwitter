import { ethers } from "ethers";
import { useState, useEffect, createContext, useContext } from "react";
import { useMetamask } from "./metamaskContext";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { contracts, account, connect, ethereum, isMetamaskContextLoaded } = useMetamask();

  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => { getBalance() }, [account]);

  useEffect(async () => {
    if (isMetamaskContextLoaded && (!user || !user.exists)) {
      getUser();
    }
  }, [isMetamaskContextLoaded]);

  async function getUser() {
    try {
      const newUser = await contracts.dwittos.getUser(account);
      if (newUser.exists) {
        setUser({
          id: +newUser.id,
          addr: newUser.addr,
          username: newUser.username,
          bio: newUser.bio,
          picture: newUser.picture,
          exists: newUser.exists
        });
      }
    }
    catch (e) { console.error(e); }
  }

  async function getBalance() {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);

      provider.getBalance(account).then((res) => {
        if (account) setBalance(ethers.utils.formatEther(res));
      });
    }
  }

  const value = { user, balance, getUser }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}
