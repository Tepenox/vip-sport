const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Subcategory = {};

Subcategory.getAll = function () {
    return db.prepare("select * from Subcategories").all();
};

Subcategory.getById = function (id) {
    return db.prepare("select * from Subcategories where id = ?").get(id);
};

Subcategory.getAllByParentId = function (parentId) {
    return db.prepare("select * from Subcategories where parentId = ? ORDER BY id ASC").all(parentId);
};

module.exports = Subcategory;