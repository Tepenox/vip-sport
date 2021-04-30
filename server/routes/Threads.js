let express = require("express");
let router = express.Router(); //new instance of the express router
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Thread = require("../models/Thread");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

function verifyThreadOwnerShip(req, res, next) {
  let thread = Thread.getByid(req.params.id);
  if (thread.ownerId === req.userId) {
    return next();
  }
  res.status(401).send("unauthorized acces to thread");
}

router.get("/threads", (req, res) => {
  if (req.query.title) {
    res.json(Thread.searchByTitle(title));
  } else {
    res.json(Thread.getAll());
  }
});

router.post("/threads", Middlewares.verifyToken, (req, res) => {
  let receivedThread = req.body;
  receivedThread.ownerId = req.userId;
  let createdThreadId = Thread.create(receivedThread);
  return Thread.getByid(createdThreadId);
});

router.put(
  "/threads/:id",
  Middlewares.verifyToken,
  verifyThreadOwnerShip,
  (req, res) => {
    let receivedThread = req.body;
    receivedThread.id = req.params.id;
    Thread.edit(receivedThread) 
    return Thread.getByid(req.params.id);
  }
);

router.delete(
  "/threads/:id",
  Middlewares.verifyToken,
  verifyThreadOwnerShip,
  (req, res) => {
    if(Thread.delete(req.params.id)>=1){
        res.send('deleted');
    }else{
        res.status(404).send('something went wrong');
    }
    

  }
);

module.exports = router;
