let express = require("express");
let router = express.Router(); 
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let ThreadReply = require("../models/ThreadReply");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

function verifyReplyOwnerShip(req,res,next){
    if(req.userId === ThreadReply.getByid(req.params.id).ownerId){
      next();
    } else{
      res.status(401).send("Unauthorized");
    }
}

router.get("/threadReplies",(req,res)=>{
    if (req.query.threadId)
        res.json(ThreadReply.getAllByThreadId(req.query.threadId));
    else if (req.query.id)
        res.json(ThreadReply.getByid(req.query.id));
    else
        res.json(ThreadReply.getAll());
});

router.get("/threadReplies/:id", (req, res) => {
    res.json(ThreadReply.getByid(req.params.id));
});

router.get("/threadReplies/thread/:threadId", (req, res) => {
    if (req.query.option == 'first')
        res.json(ThreadReply.getFirstPostInThread(req.params.threadId));
    else if (req.query.option == 'last')
        res.json(ThreadReply.getLastPostInThread(req.params.threadId));
});

router.post("/threadReplies", Middlewares.verifyToken, (req,res)=>{
    let reply = req.body;
    let replyId = ThreadReply.create(reply);
    return res.json(ThreadReply.getByid(replyId));
});

router.put("threadReplies/:id", (req,res)=>{
    

});

router.delete("/threadReplies/:id", (req,res)=>{
    if (ThreadReply.delete(req.params.id) > 0) {
        res.send('Message deleted.');
    } else {
        res.status(500).send('Something went wrong. Message might not exist.');
    }
});

module.exports = router;