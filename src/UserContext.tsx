/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface UserContextType {
  user: {
    name: string;
    email?: string;
    password?: string;
  };
  setUser: React.Dispatch<React.SetStateAction<unknown>>;
  ready: boolean;
}

export const UserContext = createContext<UserContextType>({
  user: {
    name: "",
    email: "",
    password: "",
  },
  setUser: () => {},
  ready: false,
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
