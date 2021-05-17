let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Post = require("../models/Post");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

function verifyPostOwnerShip(req,res,next){
    if(req.userId === Post.getByid(req.params.id).ownerId){
      next();
    } else{
      res.status(401).send("aa batard tu fumes");
    }
}


router.get("/posts", (req, res) => {
  if(req.query.categories){
    res.json(Post.getByCategory(req.query.categories))
  }else if(req.query.id){
    res.json(Post.getByid(req.query.id));
  }else {
    res.json(Post.getAll());
    console.log(req.headers);
  }
});

router.post("/posts",Middlewares.verifyToken, (req, res) => {
  let receivedData = req.body;
  receivedData.ownerId = req.userId;
  let postId= Post.create(receivedData);
  return res.json(Post.getByid(postId));
});

router.put("/posts/:id",Middlewares.verifyToken, verifyPostOwnerShip,(req, res) => {
  let receivedData = req.body;
  receivedData.id = req.params.id;
  receivedData.ownerId = req.userId;
  Post.edit(receivedData);
  return Post.getByid(req.params.id);

});

router.delete("/posts/:id", Middlewares.verifyToken,verifyPostOwnerShip,(req, res) => {
  if (Post.delete(req.params.id) > 0){
    res.send("deleted");
  }else{
    res.status(500).send('something went wrong');
}

});


module.exports = router;