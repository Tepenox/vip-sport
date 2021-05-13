let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Follow = require("../models/Follow")
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("follows/:followerid" , (req , res) => {
    res.json(Follow.getFollowers(req.params.followerid));
});

router.post("follows/:followerid/:followedid" , (req , res) => {
    res.json(Follow.addFollower(req.params.followerid, req.params.followedid));
});

router.delete("follows/:followerid/:followedid" , (req , res) => {
    res.json(Follow.deleteFollower(req.params.followerid, req.params.followedid));
});








