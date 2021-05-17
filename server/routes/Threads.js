let express = require("express");
let router = express.Router(); 
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
    res.json(Thread.searchByTitle(req.query.title));
  } else if (req.query.subcategoryId) {
    res.json(Thread.getAllInSubcategory(req.query.subcategoryId));
  } else if (req.query.id) {
    res.json(Thread.getByid(req.query.id));
  } else {
    res.json(Thread.getAll());
  }
});

router.post("/threads", Middlewares.verifyToken, (req, res) => {
  let receivedThread = req.body;
  let createdThreadId = Thread.create(receivedThread);
  return res.json(Thread.getByid(createdThreadId));
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

router.delete("/threads/:id", Middlewares.verifyToken, verifyThreadOwnerShip, (req, res) => {
  if(Thread.delete(req.params.id) >= 1){
    res.send('Thread deleted.');
  }else{
    res.status(500).send('Something went wrong. Thread might not exist.');
  }
});

module.exports = router;
