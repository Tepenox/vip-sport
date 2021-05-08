const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Thread = {};

Thread.getByid = function (id) {
  let thread = db.prepare("select * from Threads where id = ?").get(id);
  return thread;
};

Thread.getAll = function () {
  let threads = db.prepare("select * from Threads order by date DESC").all();
  return threads;
};

Thread.getAllInSubcategory = function (subcategoryId) {
  let threads = db.prepare("select * from Threads where subcategoryId = ? order by date DESC").all(subcategoryId);
  return threads;
};

Thread.create = function (thread) {
  let threadId = db
    .prepare(
      `insert into threads(\
        title ,\
        ownerId ,\
        date ,\
        categories \
    )values(\
        @title,\
        @ownerId,\
        datetime('now'),\
        @categories\
    );`
    )
    .run(thread).lastInsertRowid;
  return threadId;
};

Thread.edit = function (thread) {
 return db.prepare(
    "update threads set\
    title = @title ,\
    ownerId = @ownerId ,\
    categories = @categories\
    where id = @id\
    "
  ).run(thread).changes;
};

Thread.delete = function (id) {
    return db.prepare("delete from threads where  id= ?").run(id).changes;
};

Thread.searchByTitle = function(title){
    return db.prepare("select * from threads where title like ?").all('%'+ title +'%');
}

module.exports = Thread;
