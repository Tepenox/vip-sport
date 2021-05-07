let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Like = require("../models/like")
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/likes/:subjecttype/:subjectid", (req, res) => {
  res.json(Like.getCountBySubjectId(req.params.subjecttype,req.params.subjectId))
});

router.get("/likes/:subjecttype/:subjectid/:ownerid", (req, res) => {
  res.json(Like.getLike(req.params.subjecttype,req.params.subjectId,req.params.ownerid))
});


router.post("/likes/:subjecttype/:subjectid/:ownerid", (req, res) => {
  if(Like.getLike(req.params.subjecttype,req.params.subjectId,req.params.ownerid)){
    res.status(401).send('user already liked this object');
  }else {
    Like.create(req.params.subjecttype,req.params.subjectId,req.params.ownerid)
    res.json(Like.getLike(req.params.subjecttype,req.params.subjectId,req.params.ownerid));
  }
});


router.delete("/likes/:subjecttype/:subjectid/:ownerid", (req, res) => {
    if(Like.delete(req.params.subjecttype,req.params.subjectId,req.params.ownerid)> 0)
    res.json("done");
    else
    res.status(404).send("specified like with these params was not found");
  
});
