const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Category = {};

Category.getAll = function () {
    return db.prepare("select * from Categories").all();
};

Category.getByid = function (id) {
    return db.prepare("select * from Categories where id = ?").get(id);
};

Category.getAllByParentId = function (parentId) {
    return db.prepare("select * from Categories where parentId = ? ORDER BY id ASC").all(parentId);
};

module.exports = Category;