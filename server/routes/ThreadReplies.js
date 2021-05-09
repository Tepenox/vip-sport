let express = require("express");
let router = express.Router(); 
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let ThreadReply = require("../models/ThreadReply");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");


router.get("/threadReplies",(req,res)=>{
    if (req.query.threadId)
        res.json(ThreadReply.getAllByThreadId(req.query.threadId));
    else if (req.query.id)
        res.json(ThreadReply.getByid(req.query.id));
    else
        res.json(ThreadReply.getAll());
});


router.post("/threadReplies",(req,res)=>{

});

router.put("threadReplies/:id",(req,res)=>{
    

});

router.delete("threadReplies/:id",(req,res)=>{
    

});

module.exports = router;