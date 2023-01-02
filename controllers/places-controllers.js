
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

const getPlaceById = (req,res,next)=>{
    const placeId = req.params.pid;
    const place=DUMMY_PLACES.find(p=>{ 
        return p.id === placeId
    });
    if(!place){
        // throw new HttpError('couldnot find any id',404);
        return res.status(404).json({message:"couldnot find id"});
    }
    res.json({place});
}

const getPlacesByUserId =  (req,res,next)=>{
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p=>{
        return p.creator === userId;
    })
    if(!places || places.length === 0){
        return res.status(404).json({message:"couldnot find creater id"});
      
    }
    res.json({places});

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

const updatePlaceById = (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({message:"invalid input"});
        
    }

    const {title,description}=req.body;
    const placeId = req.params.pid;
    const updatePlace={...DUMMY_PLACES.find(p=>p.id===placeId)}

    const placeIndex = DUMMY_PLACES.findIndex(p=>p.id===placeId);

    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex]=updatePlace;

    res.status(200).json({place:updatePlace});
}

const deletePlaceById = (req,res,next)=>{
    const placeId = req.params.pid;

    if (!DUMMY_PLACES.find(p=>p.id===placeId)){
        res.status(200).json({message:"couldnot find a place for that id"});
    };
    DUMMY_PLACES = DUMMY_PLACES.filter(p=>p.id !== placeId);

    res.status(200).json({message:"place is successfully deleted"});
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId=getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;