const { v4: uuidv4 } = require('uuid');
// const {validationResult} = require("express-validator");
const User=require('../models/user');


const DUMMY_USERS = [{
    id:"u1",
    name:"bishal",
    email:"test@gmail.com",
    password:'testors'
}]

const getUsers = (req,res,next) =>{
    res.json(
        {
            users:DUMMY_USERS
        }
    )
}

const signup= async(req,res,next)=>{  
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     res.status(422).json({message:"invalid input"});
        
    // }

    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser=await User.findOne({email:email})
    }catch(err){
         res.status(500).json({message:"something failed"})
    }

    if(existingUser){
        res(422).json({message:"User already exist"});
    }

    const createdUser = new User({
        name,
        email,
        image:"https://cdn.siasat.com/wp-content/uploads/2022/12/srk-5-780x470.jpg",
        password,
        places:[]
    });

    try{
        await createdUser.save();
    }catch(err){
    res.status(404).json({message:"couldnot able to save"});
       return console.log(err);
    }




    
    res.status(201).json({user:createdUser.toObject({getters:true})});
};

const login = async(req,res,next)=>{
    const {email,password}= req.body;

      let existingUser;
    try{
        existingUser=await User.findOne({email:email})
    }catch(err){
         res.status(500).json({message:"something failed"})
    }

   

    if(!existingUser||existingUser.password!==password){
        res.status(401).json({message:"invalid credential"});
    }

    

    res.status(200).json({message:'logined in succesfully'});
}



exports.getUsers = getUsers;
exports.signup = signup;
exports.login=login;