let express = require("express");
let router = express.Router(); 
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Notification = require("../models/Notification");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/notifications",(req,res)=>{
    if(req.query.receiverId){
        res.json(Notification.getByReceiverId(req.query.receiverId));
    }
    else if (req.query.id){
        res.json(Notification.getById(req.query.id));
    }else {
        res.status(500).send("no queries were set bruhh")
    }
    
});

router.post("/notifications",(req,res)=>{
    if(Notification.getByDettails(req.body)){
        res.send("no need to send the same notification twice")
    }else if(req.body.fromId == req.body.receiverId){
        res.send("no need to notify the user with actions of himself");
    }else {
        res.json(Notification.getById(Notification.create(req.body)));
    }
})

router.delete("/notifications/:id",(req,res)=>{
    if(Notification.delete(req.params.id) > 0)
    res.json("done");
    else{
        res.status(500).send("something went wrong while trying to delete Notification")
    }
})


module.exports = router;