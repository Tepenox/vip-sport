const jwt = require('jsonwebtoken');
let Token = require("../models/Token");

let middlewares = {}



middlewares.verifyToken = function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    try{
      let payload = jwt.verify(token, Token.hashKey);
      req.userId = payload.subject;  
    }catch{
      return res.status(401).send('Unauthorized request');    
    }
    next()
  }

  module.exports = middlewares;

