const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Disikes = {};

Dislikes.getAllByPost = function (postId){
    return db.prepare("select * from dislikes where postId = ? order by date desc").all(postId);
}

Dislikes.delete = function(id){
    return db.prepare("delete from dislike where id = ?").run(id).changes;
}