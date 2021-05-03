let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

// let ThreadReply = require("../models/ThreadReply");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/posts/:postid/postreplies", (req, res) => {
  //get all posts desc date of a post 
});

router.post("/posts/:postid/postreplies", (req, res) => {
  //create a post reply of a post
});

router.put("/posts/:postid/postreplies/:id", (req, res) => {
  // update a postreply related to a post with postid
});

router.delete("/posts/:postid/postreplies/:id", (req, res) => {
  // delete a postreply related to a post with a postid 
});
