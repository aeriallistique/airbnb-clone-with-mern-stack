import { useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function BookingWidget({place}){
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [redirect, setRedirect] = useState('')

  let numberOfDays = 0;
  if(checkIn && checkOut){
    numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  }

  async function bookThisPlace(){
    const response = await axios.post('/bookings',{
      checkIn, checkOut, numberOfGuests, name, phone,
      place: place._id,
      price:numberOfDays * place.price
    });
    console.log(response)
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if(redirect){
    return <Navigate to={redirect} />
  }

  return(
    <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
            Price: ${place.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
              <div className="flex">
                <div className="py-3 px-4 ">
                  <label>Check in</label>
                  <input 
                    type="date" 
                    value={checkIn} 
                    onChange={(ev)=> setCheckIn(ev.target.value)}
                  />
                </div>
                <div className="py-3  px-4 border-l">
                  <label>Check out</label>
                  <input 
                    type="date" 
                    value={checkOut} 
                    onChange={(ev)=> setCheckOut(ev.target.value)} 
                  />
                </div>
              </div>
              <div>
              <div className="py-3  px-4 border-t">
                  <label htmlFor='guests'>Number of guests</label>
                  <select 
                    name="guests" 
                    id="" 
                    value={numberOfGuests} 
                    onChange={(ev)=> setNumberOfGuests(ev.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  
                </div>
                {numberOfDays > 0 && (
                  <div className="py-3 px-4 border-t">
                    <label htmlFor="">Your full name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(ev)=> setName(ev.target.value)}
                      />
                    <label htmlFor="">Phone number</label>
                    <input 
                      type="telephone" 
                      value={phone}
                      onChange={(ev)=> setPhone(ev.target.value)}
                      />
                  </div>
                )}
              </div>
              
            </div>
            {numberOfDays > 0 && (
              <button onClick={bookThisPlace} className="green mt-4">
              Book this Place
                <span className="ml-2">$ {numberOfDays * place.price}</span>
            </button>
            )}
            
            {numberOfDays< 1 &&(
              <button onClick={bookThisPlace} className="primary mt-4">
              Book this Place  
            </button>
            )}
          </div>
  )
  }