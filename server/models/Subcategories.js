const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Subcategory = {};

Category.getAll = function () {
    return db.prepare("select * from Subcategories").all();
};

Category.getByid = function (id) {
    return db.prepare("select * from Subcategories where id = ?").get(id);
};

Category.getAllByParentId = function (parentId) {
    return db.prepare("select * from Subcategories where parentId = ? ORDER BY ASC").all(parentId);
};