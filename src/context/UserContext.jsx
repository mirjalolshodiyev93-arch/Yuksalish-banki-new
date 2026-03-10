import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "XXX XXXX",
    email: "xxxx@mail.com",
   
    avatar: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}