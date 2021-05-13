const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Follow = {};

Follows.addFollower = function(followerId, followedId){
    db.prepare("Insert into follows VALUES (?,?)").run(followerId,followedId);
}

Follows.getFollowers = function (followerId){
    db.prepare("SELECT COUNT (*) from follows WHERE followerId = ?").get(followerId);
}

Follows.deleteFollower = function(followerId, followedId){
    db.prepare("delete from follows where followerId = ? AND followedId = ? ").run(followerId,followedId);
}

module.exports = Follow;