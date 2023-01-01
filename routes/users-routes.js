const express = require('express');

const UsersControllers = require('../controllers/users-controllers');

const router = express.Router();

router.get("/",UsersControllers.getUsers);

 router.post("/signup",UsersControllers.signup);
 router.post("/login", UsersControllers.login);

module.exports = router;