const mongoose=require('mongoose');

 const {validationResult} = require('express-validator');
 const Place = require('../models/place');
 const User = require('../models/user');



const getPlaceById = async(req,res,next)=>{
    const placeId = req.params.pid;
   let place;

   try{
    place= await Place.findById(placeId) 
   }catch(err){
    res.status(500).json({message:"Something went wrong , couldnot find a place"});
   }

    if(!place){
        // throw new HttpError('couldnot find any id',404);
        return res.status(404).json({message:"couldnot find id"});
    }
    res.json({place:place.toObject({getters:true})});
}

const getPlacesByUserId = async (req,res,next)=>{
    const userId = req.params.uid;
   let userWithPlaces;

   try{
    userWithPlaces=await User.findById(userId).populate('places');
   }catch(err){
    res.status(500).json({message:"fetching place failed; please try again later"})
   }
    if(!userWithPlaces || userWithPlaces.length === 0){
        return res.status(404).json({message:"couldnot find creater id"});
      
    }
    res.json({
        places: userWithPlaces.places.map(place =>
          place.toObject({ getters: true })
        )
      });
    // res.json({places:userWithPlaces.places.map(place=>place.toObject({getter:true}))});

}

const createPlace = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({message:"invalid input"});
        
    }
    const {title,description,coordinates,address,creator} = req.body;

    const createdPlace = new Place ({
        title,
        description,
        address,
        location:coordinates,
        image:"https://cdn.siasat.com/wp-content/uploads/2022/12/srk-5-780x470.jpg",
        creator
    })

    let user;
    try{
        user=await User.findById(creator);
    }catch(err){
        res.status(500).json({message:"creating place failed"});
    }

    if(!user){
        res.status(404).json({message:"couldn't find user for provided user"});
    }
    console.log(user);

    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({session:sess});
        user.places.push(createdPlace);
        await user.save({session:sess});
        await sess.commitTransaction();

    }catch(err){
        res.status(401).json({message:"couldnot upload data"});
        return console.log(err);
    }


    
    res.status(201).json({place:createdPlace})
}

const updatePlaceById = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({message:"invalid input"});
        
    }

    const {title,description}=req.body;
    const placeId = req.params.pid;
   let place;

   try{
    place = await Place.findById(placeId);

   }catch(err){
    res.status(500).json({message:"Something failed, couldnot update"})
   }

   place.title = title;
   place.description = description;
 

    try{
        await place.save();
    }catch(err){
        res.status(500).json({message:"couldnot save"});
    }

    res.status(200).json({place:place.toObject({getters:true})});
}

const deletePlaceById =async (req,res,next)=>{
    const placeId = req.params.pid;

let place;
try{
    place = await Place.findById(placeId).populate('creator');

}catch(err){
    console.log(err);
    res.status(500).json({message:"Something went wrong, could not delete place."})
}

if(!place){
    res.status(404).json({message:"couldnot find place for this id"})
}

try{
    const sess= await mongoose.startSession();
    sess.startTransaction();
    await place.remove({session:sess});
    place.creator.places.pull(place);
    await place.creator.save({session:sess});
    await sess.commitTransaction();
}catch(err){
    res.status(500).json({message:"couldnot able to deleted something failed"})
}

    res.status(200).json({message:"place is successfully deleted"});
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId=getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;