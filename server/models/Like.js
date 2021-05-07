const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Likes = {};

Likes.getAllByPost = function (postId){
    return db.prepare("select * from likes where postId = ? order by date desc").all(postId);
}

Likes.delete = function(id){
    return db.prepare("delete from Like where id = ?").run(id).changes;
}