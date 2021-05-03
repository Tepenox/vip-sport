let express = require("express");
let router = express.Router(); 
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let ThreadReply = require("../models/ThreadReply");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");


router.get("/threads/:threadid/threadreplies",(req,res)=>{
    //get all threadRplies of a thread with threadId

});


router.post("/threads/:threadid/threadreplies",(req,res)=>{
    //create a threadReplie

});

router.put("threads/:threadid/threadreplies/:id",(req,res)=>{
    

});

router.delete("threads/:threadid/threadreplies/:id",(req,res)=>{
    

});

