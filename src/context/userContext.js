import { useState, useEffect, createContext, useContext } from "react";
import getContract from "../utils/helpers/ethers/getContract";
import { useMetamask } from "./metamaskContext";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { ethereum, account, connect, isMetamaskContextLoaded } = useMetamask();

  const [contract, setContract] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(async () => {
    if (ethereum) {
      setContract(getContract(ethereum, 'Dwittos'));
    }
  }, [isMetamaskContextLoaded]);

  useEffect(() => {
    if (contract && (!user || !user.exists)) {
      getUser();
    }
  }, [contract])

  async function getUser() {
    try {
      const newUser = await contract.getUser(account);
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

  const value = { contract, user, getUser }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}
