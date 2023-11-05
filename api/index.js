const express = require('express');
const cors  = require( 'cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('./models/User.js')
const Place = require('./models/Place.js')
const Booking = require('./models/Booking.js')
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader')
const multer = require('multer')
const fs = require('fs');
const { resolveObjectURL } = require('buffer');
require('dotenv').config();
const app = express();

////////////////////////////// THINGS I MODIFIED ///////////////
const PlacesRoute = require('./routes/PlacesRoute.js')



const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'hfjskwnrcdjakdqoihf'
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))

app.use(cors({
  credentials:true,
  origin: true, 
  // 'http://127.0.0.1:5173',
}))


mongoose.connect(process.env.MONGO_URL)

function getUserDataFromReq(req){
  return new Promise((resolve, reject)=>{
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err,userData)=>{
      if(err)throw err;
      resolve(userData);
    })
  }); 
}

app.get('/test', (req, res)=>{
  res.json('test ok')
});

////////////////////////////// THINGS I MODIFIED ///////////////
app.use('/places', PlacesRoute);



app.post('/register', async (req, res)=>{
  const {name, email, password} = req.body;
  try {
    const userDoc = await User.create({
      name, 
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc)
  } catch (err) {
    res.status(422).json(err)
  }
})

app.post('/login', async(req, res)=>{
  const {email, password} = req.body;
  const userDoc = await User.findOne({email});
  if(userDoc){
    const passOk = bcrypt.compareSync(password, userDoc.password)
    if(passOk){
      jwt.sign({
        email: userDoc.email, 
        id: userDoc._id,
      },
       jwtSecret, 
       {}, 
       (err, token)=>{
        if(err)throw err;
          res.cookie('token', token).json(userDoc)
      })
    }else{
      res.status(422).json('pass NOT ok.')
    }
  }else{
    res.json('not found')
  }
})

app.get('/profile', (req,res)=>{
  const {token} = req.cookies;
  if(token){
    jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
      if(err)throw err;
      const {name, email, _id} = await User.findById(userData.id)
      res.json({name, email, _id});
    })
  }else{
    res.json(null)
  }

})

app.post('/logout', (req, res)=>{
  res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async(req, res)=>{
  const {link} = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' +newName,
  });
  res.json(newName)

})

const photosMiddleware = multer({dest: 'uploads/'});




app.post('/upload', photosMiddleware.array('photos', 100), (req, res)=>{
  const uploadedFiles = [];
  for(let i=0; i < req.files.length; i++){
    const {path, originalname} = req.files[i]
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads/', ''))
  }
  res.json(uploadedFiles)
})

// app.post('/places',  )

app.get('/user-places', (req, res)=>{
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err,userData)=>{
   const {id} = userData;
   res.json( await Place.find({owner: id}))
   })
})

// app.get('/places/:id', )


// app.put('/places', )

app.get('/places', async (req, res)=>{
  res.json(await Place.find());
})

app.post('/bookings', async  (req, res)=>{
  const userData = await getUserDataFromReq(req);

  const {place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;
  Booking.create({place, checkIn, checkOut, numberOfGuests,
                  name, phone, price,
                  user: userData.id })
          .then((doc)=>{
      res.json(doc)
  }).catch((err)=>{throw err;})
})



app.get('/bookings', async(req, res)=>{
 const userData = await getUserDataFromReq(req);
 res.json( await Booking.find({user: userData.id}).populate('place'))
})

app.listen(4000);

