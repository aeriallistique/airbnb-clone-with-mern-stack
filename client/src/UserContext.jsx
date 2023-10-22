import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
  const [user, setUser] = useState(null)
  useEffect(()=>{
    if(!user){
    const {data} = axios.get('/profile').then(({data})=>{
      setUser(data);
    })
    }
  },[]);

  return(
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider> 
  );
}