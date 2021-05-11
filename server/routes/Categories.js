let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Categories = require("../models/Categories");

router.get("/categories", (req, res) => {
    if (req.query.id)
        res.json(Categories.getById(req.query.id));
    else if (req.query.parent)
        res.json(Categories.getAllByParentId(req.query.parent));
    else
        res.json(Categories.getAll());
});