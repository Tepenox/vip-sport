let express = require("express");
let router = express.Router({mergeParams: true});//so we can acces inner params
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

// let ThreadReply = require("../models/ThreadReply");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");
const PostReply = require("../models/PostReply");

function vertifyPostReplyOwnerShip(req,res,next){
  if(PostReply.getById(req.params.id) === req.userId){
    next();
  }else {
    res.status(401).send("a batard tu fumes");
  }
}


router.get("/posts/:postid/postreplies", (req, res) => {
    res.json(PostReply.getAllByPostId(req.params.postid));
    console.log(req.params.postId);
});

router.post("/posts/:postid/postreplies",Middlewares.verifyToken, (req, res) => {
  let receivedData = req.body;
  receivedData.postId = req.params.postid;
  receivedData.ownerId = req.userId;
  let threadReplyId = PostReply.create(receivedData);
  res.json(PostReply.getById(threadReplyId));
});

router.put("/posts/:postid/postreplies/:id",Middlewares.verifyToken,vertifyPostReplyOwnerShip , (req, res) => {
   let receivedData = req.body;
   receivedData.postId = req.params.postId;
   receivedData.ownerId = req.userId;
   receivedData.id = req.params.id;
   PostReply.edit(receivedData);
   res.json(PostReply.getById(req.params.id)); 
});

router.delete("/posts/:postid/postreplies/:id",Middlewares.verifyToken,vertifyPostReplyOwnerShip ,(req, res) => {
  if (PostReplies.delete(req.params.id) > 0){
    res.send("deleted");
  }else{
    res.status(500).send('something went wrong');
}
});

module.exports = router;
