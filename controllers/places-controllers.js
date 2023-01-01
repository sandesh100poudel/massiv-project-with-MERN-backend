
const { v4: uuidv4 } = require('uuid');

const DUMMY_PLACES = [{
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

const getPlaceByUserId =  (req,res,next)=>{
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p=>{
        return p.creator === userId
    })
    if(!place){
        return res.status(404).json({message:"couldnot find creater id"});
      
    }
    res.json({place});

}

const createPlace = (req,res,next) =>{
    const {title,description,coordinates,address,creator} = req.body;

    const createdPlace = {
        id:uuidv4(),
        title,
        description,
        location:coordinates,
        address,
        creator
    }
    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({place:createdPlace})
}

const updatePlaceById = (req,res,next)=>{
    const {title,description}=req.body;
    const placeId = req.params.pid;
    const updatePlace={...DUMMY_PLACES.find(p=>p.id===placeId)}

    const placeIndex = DUMMY_PLACES.findIndex(p=>p.id===placeId);

    updatePlace.title = title;
    updatePlace.description = description;

    DUMMY_PLACES[placeIndex]=updatePlace;

    res.status(200).json({place:updatePlace});
}


exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId=getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;