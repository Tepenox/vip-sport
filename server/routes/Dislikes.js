let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Dislike = require("../models/Dislike")
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/dislikes/:subjecttype/:subjectid", (req, res) => {
  res.json(Dislike.getCountBySubjectId(req.params.subjecttype,req.params.subjectid))
});

router.get("/dislikes/:subjecttype/:subjectid/:onwerid", (req, res) => {
  res.json(Dislike.getLike(req.params.subjecttype,req.params.subjectid,req.params.ownerid))
});


router.post("/dislikes/:subjecttype/:subjectid", (req, res) => {
  if(Dislike.getLike(req.params.subjecttype,req.params.subjectid,req.userId)){
    res.status(401).send('user already disliked this object');
  }else {
    Dislike.create(req.params.subjecttype,req.params.subjectid,req.userId)
    res.json(Dislike.getLike(req.params.subjecttype,req.params.subjectid,req.userId));
  }
});


router.delete("/dislikes/:subjecttype/:subjectid", (req, res) => {
    if(Dislike.delete(req.params.subjecttype,req.params.subjectid,req.userId)> 0)
    res.json("done");
    else
    res.status(404).send("specified dislike with these params was not found");
  
});
