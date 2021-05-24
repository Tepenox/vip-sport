const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let PostReply = {};

PostReply.getById = function (id){
    return db.prepare("select * from postReplies where id = ? ").get(id);
}

PostReply.getAllByPostId = function(postId){
    return db.prepare("select * from postReplies where postId =? order by date desc ").all(postId);
}



PostReply.create = function(postReply){
    return db.prepare("insert into postReplies(\
        postId , \
        content , \
        ownerId , \
        date, \
        type \
       )values( \
           @postId, \
           @content, \
           @ownerId, \
           datetime('now'), \
           'PostComment' \
       );").run(postReply).lastInsertRowid;
}

PostReply.edit = function(postReply){
    return db.prepare("update postreplies set content=@content where id = @id").run(postReply).changes;
}


PostReply.delete = function(id){
    return db.prepare("delete from postReplies where id = ?").run(id).changes;
}

module.exports = PostReply;