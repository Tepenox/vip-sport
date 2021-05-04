const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let PostReply = {};

PostReply.getAll = function (){
    return db.prepare("select * from postReplies order by date desc").all();
}

PostReply.getAllByPostId = function(postId){
    return db.prepare("select * from postReplies where postId =? order by date desc ").all(postId);
}



PostReply.create = function(postReplies){
    return db.prepare("insert into postReplies(\
        postId , \
        content , \
        ownerId , \
        date \
       )values( \
           @postId, \
           @content, \
           @ownerId, \
           datetime('now') \
       );").run(postReplies).lastInsertRowid;
}

PostReply.delete = function(id){
    return db.prepare("delete from postReplies where id = ?").run(id).changes;
}

module.exports = PostReply;