import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";


export default function PlacesPage(){
  const [places, setPlaces] = useState([])
  useEffect(()=>{
    axios.get('/places').then(({data})=>{
      setPlaces(data)
    })
  },[])

  return(
    <div className="max-w-3xl mx-auto">
      <AccountNav />
      <div className="text-center">
        <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 && places.map(place =>(
          <Link to={'/account/places/'+place._id}>
          <div className=" flex gap-4 bg-gray-100 p-4 rounded-2xl cursor-pointer">
            <div className="w-32 h-32 bg-gray-300 grow shrink-0">
              {place.photos.length > 0 && (
                <img  src={place.photos[0]} alt=""/>
              )}
            </div>
            <div className="grow-0 shrink ">
            <h2 className="text-xl">{place.title}</h2>
            <p className="text-sm mt-2">{place.description}</p>
            </div>
            
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}