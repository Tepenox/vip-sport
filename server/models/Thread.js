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
      `insert into threads(subcategoryId, title, ownerId, date)\ 
      values(@subcategoryId, @title, @ownerId, datetime('now'));`
    )
    .run(thread).lastInsertRowid;
  return threadId;
};

Thread.setIsPinned = function (id, isPinned) {
  parsedIsPinned = isPinned ? "1" : "0";
  return db.prepare("update threads set isPinned = ?\
                    where id = ?"
  ).run(parsedIsPinned, id).changes;
};

Thread.setIsLocked = function (id, isLocked) {
  parsedIsLocked = isLocked ? "1" : "0";
  return db.prepare("update threads set isLocked = ?\
                     where id = ?"
   ).run(parsedIsLocked, id).changes;
 };

Thread.delete = function (id) {
    return db.prepare("delete from threads where id= ?").run(id).changes;
};

Thread.searchByTitle = function(title){
    return db.prepare("select * from threads where title like ?").all('%'+ title +'%');
}

module.exports = Thread;
