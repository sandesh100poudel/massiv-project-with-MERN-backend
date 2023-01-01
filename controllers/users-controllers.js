const { v4: uuidv4 } = require('uuid');


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

const signup= (req,res,next)=>{
    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u=>u.email===email)

    if(hasUser){
     res.status(422).json({message:"email already exist"});
    }
    const createdUser = {
        id:uuidv4(),
        name,
        email,
        password
    };
      DUMMY_USERS.push(createdUser);

    
    res.status(201).json({user:createdUser});
};

const login = (req,res,next)=>{
    const {email,password}= req.body;

    const identifiedUser = DUMMY_USERS.find(u=>u.email===email);

    if(!identifiedUser || identifiedUser.password !== password){
res.status(400).json({message:"couldnot identified the user"});
    }

    res.json({message:'logined in succesfully'});
}



exports.getUsers = getUsers;
exports.signup = signup;
exports.login=login;