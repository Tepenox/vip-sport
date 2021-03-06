let express = require("express");
let router = express.Router(); //new instance of the express router
let Middlewares = require("../middlewares/middlewares");
const util = require("util");
const bcrypt = require('bcrypt');
const saltRounds = 10;

let User = require("../models/User");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/users", (req, res) => {
  if (req.query.userName) {
    res.json(User.searchByUserName(req.query.userName));
  } else {
    res.json(User.getAllUsers());
  }
});

router.get("/users/:id", (req, res) => {
  let user = User.getById(req.params.id);
  if (!user) {
    res.status(404).send("no user found");
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
   
    bcrypt.hash(receivedData.password, saltRounds, function(err, hash) {
      receivedData.password = hash;
      let userId = User.create(receivedData);
      let createdUser = User.getById(userId);
      let paylaod = { subject: userId };
      let token = jwt.sign(paylaod, Token.hashKey);
  
      console.log(
        "received :" +
          util.inspect([req.body], false, null, true) +
          "\n" +
          "sent:" +
          util.inspect([createdUser, { token }], false, null, true)
      );
      res.json([createdUser, { token }]);  });
  }
});

router.post("/login", (req, res) => {
  let receivedData = req.body;
  let user = User.getByEmail(receivedData.email);
  if (user) {
  bcrypt.compare(req.receivedData, user.password, function(err, result) {
    if (result) {
      res.status(401).send("Invalid Password");
    } else {
      let paylaod = { subject: user.id };
      let token = jwt.sign(paylaod, Token.hashKey); // should be set to a global variable , it s encrypt the payload
      console.log(
        "received :" +
          util.inspect([req.body], false, null, true) +
          "\n" +
          "sent:" +
          util.inspect([user, { token }], false, null, true)
      );
      res.json([user, { token }]);
    }});
  }else{
    res.status(401).send("Invalid Email");
  }
});


router.put("/users/:id", Middlewares.verifyToken, (req, res) => {
  let receivedData = req.body;
  receivedData.id = req.params.id;
  if (!req.userId === req.params.id) {
    res.status(401).send("nice try,that's not yours");
  } else {
    User.edit(receivedData);
    res.json(User.getById(receivedData.id));
  }
});

router.get("/test", (req ,res)=>{

  bcrypt.hash("password", saltRounds, function(err, hash) {
    res.send(hash);
  })
})

module.exports = router;
