let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Like = require("../models/Like")
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/likes/:subjecttype/:subjectid", (req, res) => {
  res.json(Like.getCountBySubjectId(req.params.subjecttype,req.params.subjectid))
});

router.get("/likes/:subjecttype/:subjectid/:ownerid", (req, res) => {
  if(Like.getLike(req.params.subjecttype,req.params.subjectid,req.params.ownerid)){
    res.send("true")
  }else{
    res.send("false");
  }
});


router.post("/likes",Middlewares.verifyToken, (req, res) => {
  if(Like.getLike(req.body.subjectType,req.body.subjectId,req.userId)){
    res.status(401).send('user already liked this object');
  }else {
    Like.create(req.body.subjectType,req.body.subjectId,req.userId);
    res.json(Like.getLike(req.body.subjectType,req.body.subjectId,req.userId));

  }
});


router.delete("/likes/:subjecttype/:subjectid", Middlewares.verifyToken ,(req, res) => {
    if(Like.delete(req.params.subjecttype,req.params.subjectid,req.userId)> 0)
    res.json("done");
    else
    res.status(404).send("specified like with these params was not found");
  
});

module.exports = router;
