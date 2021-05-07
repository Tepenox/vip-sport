let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Dislike = require("../models/Dislike")
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/dislikes/:subjecttype/:subjectid", (req, res) => {
  res.json(Dislike.getCountBySubjectId(req.params.subjecttype,req.params.subjectId))
});

router.get("/dislikes/:subjecttype/:subjectid/:ownerid", (req, res) => {
  res.json(Dislike.getLike(req.params.subjecttype,req.params.subjectId,req.params.ownerid))
});


router.post("/dislikes/:subjecttype/:subjectid/:ownerid", (req, res) => {
  if(Dislike.getLike(req.params.subjecttype,req.params.subjectId,req.params.ownerid)){
    res.status(401).send('user already disliked this object');
  }else {
    Dislike.create(req.params.subjecttype,req.params.subjectId,req.params.ownerid)
    res.json(Dislike.getLike(req.params.subjecttype,req.params.subjectId,req.params.ownerid));
  }
});


router.delete("/dislikes/:subjecttype/:subjectid/:ownerid", (req, res) => {
    if(Dislike.delete(req.params.subjecttype,req.params.subjectId,req.params.ownerid)> 0)
    res.json("done");
    else
    res.status(404).send("specified dislike with these params was not found");
  
});
