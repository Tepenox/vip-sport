const jwt = require('jsonwebtoken');
let Token = require("../models/Token");

let middlewares = {}



middlewares.verifyToken = function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    console.log(token);
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, Token.hashKey);
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

  module.exports = middlewares;

