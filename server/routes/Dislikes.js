let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

// let ThreadReply = require("../models/ThreadReply");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/dislikes/:typeid/:idoftype", (req, res) => {
  //get dislikes count of a type (post , postreply ,  thread, threadreply)
});

router.post("/dislikes/:typeid/:idoftype", (req, res) => {
  //create a dislike for a type
});


router.delete("/dislikes/:typeid/:idoftype/:onwerid", (req, res) => {
  // delete a dislike on a type (post , postreply ,  thread, threadreply)
});
