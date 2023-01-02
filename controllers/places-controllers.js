
const { v4: uuidv4 } = require('uuid');
 const {validationResult} = require('express-validator');
 const Place = require('../models/place');

let DUMMY_PLACES = [{
    id:"p1",
    title:"Empire state building",
    description:"one of the most",
    location:{
        lat:40,
        lng:-67
    },
    address:"laxamangung",
    creator:"u1"
}]

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
   let places;

   try{
    places=await Place.find({creator:userId});
   }catch(err){
    res.status(500).json({message:"fetching place failed; please try again later"})
   }
    if(!places || places.length === 0){
        return res.status(404).json({message:"couldnot find creater id"});
      
    }
    res.json({places:places.map(place=>place.toObject({getter:true}))});

}

const createPlace = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({message:"invalid input"});
        
    }
    const {title,description,coordinates,address,image,creator} = req.body;

    const createdPlace = new Place ({
        title,
        description,
        address,
        location:coordinates,
        image:"https://cdn.siasat.com/wp-content/uploads/2022/12/srk-5-780x470.jpg",
        creator
    })

    try{
        await createdPlace.save()
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
    place = await Place.findById(placeId);

}catch(err){
    res.status(500).json({message:"really happy to see error"})
}

try{
    await place.remove();
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