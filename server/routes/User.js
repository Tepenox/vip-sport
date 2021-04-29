let express = require("express");
let router = express.Router(); //new instance of the express router
let Middlewares = require("../middlewares/middlewares");

let User = require("../models/User");
let Token = require("../models/Token");




router.get("/user/:username",(req,res)=>{
    let user = User.getByUserName(req.params.username)
    if(!user){
        res.status(404).send('Uknown userName');
    }else{
        res.json(user)
    }
})


router.post("/signup", (req, res) => {
    
    let receivedData = req.body;
    if(User.getByEmail(receivedData.email)){
        res.status(401).send('email already exists');
    }else if (User.getByUserName(receivedData.username)){
        res.status(401).send('user name already exists');
    }else {
        let user = User.create(receivedData);
        let paylaod = {subject:user.id};
        let token =jwt.sign(paylaod,Token.hashKey); 
        console.log(receivedData);
        res.json({token});
    }
});



router.post("/login", (req, res) => {
let receivedData = req.body;
let user = User.getByEmail(receivedData.email); 
if(!user){
    res.status(401).send('Ivalid email');
}else if (user.password !== receivedData.password ){ // TODO decrypt here
    res.status(401).send('Invalid Password');
}else {
    let paylaod = {subject:user.id};
    let token =jwt.sign(paylaod,'soo secret'); // should be set to a global variable , it s encrypt the payload
    res.json({token});
}
});

router.post("/edit", (req, res) => {
  res.json(User.edit({
    id: 2,
    username: "dorianvolt",
    firstName: "dorian",
    lastName: "volt",
    age: 22,
    email: "dorian@volt.com",
    password: "password",
    description: "sesshhh",
  }));
});

module.exports = router;
