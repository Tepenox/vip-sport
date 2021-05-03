let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

// let ThreadReply = require("../models/ThreadReply");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/posts", (req, res) => {
  //get all posts desc by dates
});

router.post("/posts", (req, res) => {
  //create a post
});

router.put("/posts/:id", (req, res) => {
  // update post with specific id
});

router.delete("/posts/:id", (req, res) => {
  // deelete post with specific id
});
