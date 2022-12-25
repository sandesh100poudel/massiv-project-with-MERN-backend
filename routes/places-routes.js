const express = require('express');
const router = express.Router();

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

router.get('/',(req,res,next)=>{
    res.json({message:"its working"});
});

router.get('/:pid',(req,res,next)=>{
    const placeId = req.params.pid;
    const place=DUMMY_PLACES.find(p=>{ 
        return p.id === placeId
    });
    if(!place){
        return res.status(404).json({message:"couldnot find id"});
    }
    res.json({place});
});

router.get("/user/:uid", (req,res,next)=>{
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p=>{
        return p.creator === userId
    })
    res.json({place});

})

module.exports= router;