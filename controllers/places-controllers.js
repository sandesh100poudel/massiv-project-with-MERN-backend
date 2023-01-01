
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

createPlace = (req,res,next) =>{
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


exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId=getPlaceByUserId;
exports.createPlace = createPlace;