const express = require('express');
const {check} = require('express-validator');

const UsersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get("/",UsersControllers.getUsers);

  router.post("/signup" ,
//     check("name").not().isEmpty,
//     check("email").isEmail(),
//     check("password").isLength({min:6})
//  ],
 UsersControllers.signup);
 router.post("/login", UsersControllers.login);

module.exports = router;