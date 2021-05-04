const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let PostReplies = {};

PostReplies.getAll = function (){
    return db.prepare("select * from postReplies order by date desc").all();
}

PostReplies.getAllByPostId = function(postId){
    return db.prepare("select * from postReplies where postId =? ").get(postId);
}



PostReplies.create = function(postReplies){
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

PostReplies.delete = function(id){
    return db.prepare("delete from postReplies where id = ?").run(id).changes;
}