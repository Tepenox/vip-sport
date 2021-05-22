const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let ThreadReply = {};

ThreadReply.getAll = function () {
  return db.prepare("SELECT * FROM threadReplies").all();
}

ThreadReply.getByid = function (id) {
  return db.prepare("select * from threadreplies where id = ?").get(id);
};

ThreadReply.getAllByThreadId = function (threadId, page) {
  let offset = 10 * (parseInt(page, 10) - 1);
  return db
    .prepare("select * from threadReplies where threadId = ? order by id ASC LIMIT 10 OFFSET ?")
    .all(threadId, offset);
};

ThreadReply.getFirstPostInThread = function (threadId) {
  return db
    .prepare("SELECT * FROM threadReplies WHERE threadId = ? ORDER BY id ASC LIMIT 1")
    .get(threadId);
}

ThreadReply.getLastPostInThread = function (threadId) {
  return db
    .prepare("SELECT * FROM threadReplies WHERE threadId = ? ORDER BY id DESC LIMIT 1")
    .get(threadId);
}

ThreadReply.getAmountOfPages = function (threadId) {
  return db.prepare("SELECT (COUNT(*)-1)/10 + 1 AS pageAmount FROM threadReplies WHERE threadId = ?")
    .get(threadId);
}

ThreadReply.create = function (threadReply) {
  return db
    .prepare(
      "insert into threadreplies (threadId , ownerId, date, content)\
    values (\
        @threadId,@ownerId, datetime('now'), @content)"
    )
    .run(threadReply).lastInsertRowid;
};

ThreadReply.edit = function (threadReply) {
  return db
    .prepare(
      "update threadreplies set threadId = @threadId , content = @content , ownerId= @ownerId where id = @id")
    .run(threadReply).changes;
};


ThreadReply.delete = function(id){
  return db.prepare("delete from threadReplies where id = ?").run(id).changes;
}

ThreadReply.deleteAllFromThread = function(threadId) {
  return db.prepare("DELETE FROM threadReplies WHERE threadId = ?").run(threadId).changes;
}

module.exports = ThreadReply;
