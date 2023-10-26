import Perks from "./Perks";
import PhotosUploader from "../PhotosUploader";
import { useState } from "react";



export default function PlacesFormPage(){
  const [title, setTitle] = useState('')
  const [addedPhotos, setAddedPhotos] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [perks, setPerks] = useState('')
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

  function inputHeader(text){
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    )
  }

  function inputDescription(text){
    return(
      <p className="text-gray-500 text-sm">{text}</p>
    )
  }

  function preInput(header, description){
    return(
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  async function addNewPlace(en){
    ev.preventDefault();
    const placeData = {title, 
                  address, 
                  addedPhotos, 
                  description, 
                  perks, 
                  extraInfo, 
                  checkIn, 
                  checkOut, 
                  maxGuests}
    await axios.post('/places', placeData);
  }

  return(
    <div>
          <form onSubmit={addNewPlace}>
            {preInput("Title", "title for your place")}
            <input 
              type="text" 
              placeholder="title. for example: My lovely Apartment " 
              value={title}
              onChange={ev => setTitle(ev.target.value)}  
            />
            {preInput("Address to this place", "")}
            <input 
              type="text"  
              placeholder="address"
              value={address}
              onChange={ev => setAddress(ev.target.value)} 
            />
            {preInput("Photos", "the more the better")}
              <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} /> 
            {preInput("Description", "description of the place")}
            <textarea 
              value={description}
              onChange={ev => setDescription(ev.target.value)}  
            />
            {preInput("Perks", "select all the perks offered in this place")}
            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks}/>
            </div>
            {preInput("Extra Info", "House rules, etc")}
            <textarea 
              value={extraInfo}
              onChange={ev => setExtraInfo(ev.target.value)}  
            />
            {preInput("Check in and checkout times", "House rules, etc", "Add checkin and checkout times, remember to have time window for cleaning room")}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input 
                  type="text" 
                  placeholder="14"
                  value={checkIn}
                  onChange={ev => setCheckIn(ev.target.value)}  
                />
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
                <input 
                  type="text" 
                  placeholder="11" 
                  value={checkOut}
                  onChange={ev => setCheckOut(ev.target.value)}
                />
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input 
                  type="number" 
                  value={maxGuests}
                  onChange={ev => setMaxGuests(ev.target.value)}  
                />
              </div>
            </div>
              <button className="primary my-4"> Save </button>
          </form>
        </div>
  );
}