let express = require("express");
let router = express.Router(); //new instance of the express router
let Middlewares = require("../middlewares/middlewares");
const util = require('util')

let User = require("../models/User");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken")

router.get("/user/:username", (req, res) => {
  let user = User.getByUserName(req.params.username);
  if (!user) {
    res.status(404).send("Uknown userName");
  } else {
    res.json(user);
  }
});

router.post("/signup", (req, res) => {
  let receivedData = req.body;
  if (User.getByEmail(receivedData.email)) {
    res.status(401).send("email already exists");
  } else if (User.getByUserName(receivedData.username)) {
    res.status(401).send("user name already exists");
  } else {
    let userId = User.create(receivedData);
    let createdUser = User.getById(userId);
    let paylaod = { subject: userId };
    let token = jwt.sign(paylaod, Token.hashKey);
    
    console.log("received :" + util.inspect([req.body],false, null, true)  + "\n" + "sent:" +util.inspect([createdUser, { token }],false, null, true) );
    res.json([createdUser, { token }]);
  }
});

router.post("/login", (req, res) => {
  let receivedData = req.body;
  let user = User.getByEmail(receivedData.email);
  if (!user) {
    res.status(401).send("Ivalid email");
  } else if (user.password !== receivedData.password) {
    // TODO decrypt here
    res.status(401).send("Invalid Password");
  } else {
    let paylaod = { subject: user.id };
    let token = jwt.sign(paylaod, "soo secret"); // should be set to a global variable , it s encrypt the payload
    console.log("received :" + util.inspect([req.body],false, null, true)  + "\n" + "sent:" +util.inspect([user, { token }],false, null, true) );
    res.json([user, { token }]);
  }
});

router.post("/edit", Middlewares.verifyToken, (req, res) => {
  let receivedData = req.body;
    if(!req.userId === receivedData.id){
      res.status(401).send("nice try");
    }else{
      User.edit(receivedData);
      res.json(User.getById(receivedData.id))
    }

  res.send("hmm helo user");
});

module.exports = router;
