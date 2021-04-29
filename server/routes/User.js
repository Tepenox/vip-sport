var express = require("express");
var router = express.Router(); //new instance of the express router 

var User = require("../models/User")



router.post("/signup",(req,res)=>{
    //login le user 
    res.json(User.create("the user"))
});

router.post("/login",(req,res)=>{
    //login user et envoyer user
    res.json(User.get(1))
});

module.exports = router;