import { useContext, useState } from "react"
import { Navigate, Link,useParams } from "react-router-dom";
import { UserContext } from "../UserContext.jsx"
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";


export default function AccountPage(){
  const [redirect, setRedirect] = useState(null)
  const {ready,user, setUser} = useContext(UserContext)
  let {subpage} = useParams();
  if(subpage=== undefined){
    subpage= 'profile';
  }


  async function logOut(){
    await axios.post('/logout');
    setUser(null)
    setRedirect('/')
  }

  if(!ready) return 'Loading...';

  if(ready && !user && !redirect){
    return <Navigate to={'/login'} />
  }
  
  

  if(redirect){
    return <Navigate to={redirect} />
  };

  return(
    <div>
      <AccountNav />
      {subpage==='profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
        <button onClick={logOut} className="primary max-w-sm mt-2">Log Out</button>
     </div>
      )}
      {subpage==='places' && (
        <PlacesPage />
      )}
    </div>
  )
}

