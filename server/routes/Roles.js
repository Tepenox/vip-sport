let express = require("express");
let router = express.Router(); 
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Role = require("../models/Role");
let Token = require("../models/Token");
let jwt = require("jsonwebtoken");

router.get("/roles", (req, res) => {
    if (req.query.id)
        res.json(Role.getById(req.query.id));
    else
        res.json(Role.getAll());
});

router.post("/roles", Middlewares.verifyToken, (req, res) => {
    let role = req.body;
    let roleId = Role.create(role);
    return res.json(Role.getById(roleId));
});

module.exports = router;