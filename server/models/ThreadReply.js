const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let ThreadReply = {};

ThreadReply.getByid = function (id) {
  return db.prepare("select * from threadreplies where id = ?").get(id);
};

ThreadReply.getAllByThreadId = function (threadId) {
  return db
    .prepare("select * from threadreplies where threadId = ?")
    .all(threadId);
};

ThreadReply.create = function (threadReply) {
  return db
    .prepare(
      "insert into threadreplies (threadId , content , ownerId)\
    values (\
        @threadId,@content,@ownerId)"
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

module.exports = ThreadReply;
