const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Likes = {};

Likes.getCountBySubjectId = function (subjectType, subjectId){
    return db.prepare("select count(*) from likes where subjectType = ? and subjectId = ?").get(subjectType,subjectId);
}

Likes.create = function(subjectType,subjectId,ownerId) {
    return db.prepare("insert into likes(subjectId,subjectType,ownerId) values (?,?,?)").run(subjectType,subjectId,ownerId).lastInsertRowid;

}

Likes.delete = function(subjectType,subjectId,ownerId){
    return db.prepare("delete from likes where subjectType = ? AND subjectId = ? AND ownerId = ?").run(subjectType,subjectId,ownerId).changes;
}



module.exports = Likes;