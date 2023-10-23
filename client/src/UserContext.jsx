import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)
  useEffect(()=>{
    if(!user){
    const {data} = axios.get('/profile').then(({data})=>{
      setUser(data);
      setReady(true)
    })
    }
  },[]);

  return(
    <UserContext.Provider value={{user, setUser,ready }}>
      {children}
    </UserContext.Provider> 
  );
}