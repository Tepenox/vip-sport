let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Like = require("../models/like")
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/likes/:subjecttype/:subjectid", (req, res) => {
  
});

router.post("/likes/:subjecttype/:subjectid", (req, res) => {
  //create a like for a type
});


router.delete("/likes/:subjecttype/:subjectid", (req, res) => {
  // delete a like on a type (post , postreply ,  thread, threadreply)
});
