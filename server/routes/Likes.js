let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

// let ThreadReply = require("../models/ThreadReply");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/likes/:typeid/:idoftype", (req, res) => {
  //get likes count of a type (post , postreply ,  thread, threadreply)
});

router.post("/likes/:typeid/:idoftype", (req, res) => {
  //create a like for a type
});


router.delete("/likes/:typeid/:idoftype/:onwerid", (req, res) => {
  // delete a like on a type (post , postreply ,  thread, threadreply)
});
