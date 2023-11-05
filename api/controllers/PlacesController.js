const Place = require('../models/Place.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'hfjskwnrcdjakdqoihf'


const getPlace = async (req,res)=>{
    const {id} = req.params;
    res.json(await Place.findById(id))
  }

const addNewPlace = (req, res)=>{
  const {token} = req.cookies;
  const {title, 
    address, addedPhotos, description, perks, 
    extraInfo, checkIn, checkOut, maxGuests,price
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
    if(err)throw err;
 
    const placeDoc = await Place.create({
      owner: userData.id,
      title, address, photos:addedPhotos, description, perks, 
      extraInfo, checkIn, checkOut, maxGuests,price,
    });
    res.json(placeDoc)
  });

}

const updatePlace = async (req, res)=>{
  const {token} = req.cookies;
  const {id, title,address, addedPhotos, description,
         perks, extraInfo, checkIn, checkOut, 
         maxGuests,price,} = req.body;
  jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
    if(err)throw err;

    const placeDoc = await Place.findById(id); 
    if(userData.id === placeDoc?.owner.toString() ){
      placeDoc.set({
        title, address, photos:addedPhotos, description, perks, 
        extraInfo, checkIn, checkOut, maxGuests,price,
      });
      await placeDoc.save()
      res.json("ok")
    }
    })
}



module.exports = getPlace,
module.exports= addNewPlace;
module.exports= updatePlace;
