import { useContext, useState } from "react"
import { Navigate, Link,useParams } from "react-router-dom";
import { UserContext } from "../UserContext.jsx"
import axios from "axios";


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
  
  function linkCLasses(type=null){
    let classes= 'py-2 px-6';
    if(type=== subpage){
      classes += ' bg-primary text-white rounded-full'
    }
    return classes;
  }

  if(redirect){
    return <Navigate to={redirect} />
  };

  return(
    <div>
      <nav className="w-full flex mt-8 gap-2 justify-center mb-8">
        <Link className={linkCLasses('profile')}  to={'/account'}>My Profiles</Link>
        <Link className={linkCLasses('bookings')} to={'/account/bookings'} >My Bookings</Link>  
        <Link className={linkCLasses('places')} to={'/account/places'} >My Accommodations</Link>  
      </nav>  
      {subpage==='profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
        <button onClick={logOut} className="primary max-w-sm mt-2">Log Out</button>
     </div>
      )}
    </div>
  )
}

