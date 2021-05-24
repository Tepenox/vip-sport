let express = require("express");
let router = express.Router(); 
let Middlewares = require("../middlewares/middlewares");
const util = require("util");

let Subcategory = require("../models/Subcategories");

router.get("/subcategories", (req, res) => {
    if (req.query.id)
        res.json(Subcategory.getById(req.query.id));
    else if (req.query.parentId)
        res.json(Subcategory.getAllByParentId(req.query.parentId));
    else
        res.json(Subcategory.getAll());
});

module.exports = router;