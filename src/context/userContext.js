import { useState, useEffect, createContext, useContext } from "react";
import { useMetamask } from "./metamaskContext";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const { contracts, account, connect, isMetamaskContextLoaded } = useMetamask();

  const [user, setUser] = useState(null);

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

  const value = { user, getUser }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}
