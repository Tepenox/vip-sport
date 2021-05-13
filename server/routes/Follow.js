let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Follow = require("../models/Follow")
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/follows/:followedid" , (req , res) => {
    res.json(Follow.getFollowers(req.params.followerid));
});

router.get("/follows/:followerid/:followedid" , (req,res) => {
    res.json(Follow.getFollow(req.params.followerid,req.params.followedid))
});
router.post("/follows" , (req , res) => {
    res.json(Follow.addFollower(req.body.followerId, req.body.followedId));
});

router.delete("/follows/:followerid/:followedid" , (req , res) => {
    res.json(Follow.deleteFollower(req.params.followerid, req.params.followedid));
});

module.exports = router;







