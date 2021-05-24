const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Role = {};

Role.getAll = function() {
    return db.prepare("SELECT * FROM roles").all();
}

Role.getById = function(id) {
    return db.prepare("SELECT * FROM roles WHERE id = ?").get(id);
}

Role.create = function(role) {
    return db.prepare("INSERT INTO roles (name, moderationPower) VALUES (@name, @moderationPower)").run(role).lastInsertRowid;
}

module.exports = Role;