import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";

export default function BookingsPage(){
  const [bookings, setBookings] = useState([])
  useEffect(()=>{
    axios.get('/bookings').then(response=>{
      setBookings(res.data)
    })
  },[])

  return(
    <div>
      <AccountNav />
      <div>

      </div>
    </div>
  )
}