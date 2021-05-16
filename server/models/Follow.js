const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Follows = {};

Follows.addFollower = function(followerId, followedId){
    
    return db.prepare("Insert into follows (followerId, followedId) VALUES (?,?)").run(followerId,followedId);
}

Follows.getFollow = function (followerId,followedId){
    if(db.prepare("select * from follows where followerId=? AND followedId=?").get(followerId,followedId)){
       return true;
    };
    return false;
}

Follows.getFollowers = function (followedId){
    return db.prepare("SELECT COUNT(*) as count from follows WHERE followedId = ?").get(followedId);
}

Follows.deleteFollower = function(followerId, followedId){
    return db.prepare("delete from follows where followerId = ? AND followedId = ? ").run(followerId,followedId);
}

module.exports = Follows;