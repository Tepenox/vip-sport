let express = require("express");
let router = express.Router();
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Categories = require("../models/Categories");

router.get("/categories", (req, res) => {
    if (req.query.id)
        res.json(Categories.getById(req.query.id));
    else if (req.query.parentId)
        res.json(Categories.getAllByParentId(req.query.parentId));
    else
        res.json(Categories.getAll());
});

module.exports = router;