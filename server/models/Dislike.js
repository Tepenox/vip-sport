const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Dislikes = {};

Dislikes.getCountBySubjectId = function (subjectType, subjectId){
    return db.prepare("select count(*) as count from dislikes where subjectType = ? and subjectId = ?").get(subjectType,subjectId);
}

Dislikes.getDislike = function (subjectType,subjectId,ownerId){
    return db.prepare("select * from dislikes where subjectType = ? AND subjectId = ? AND ownerId = ?").get(subjectType,subjectId,ownerId);
} 

Dislikes.create = function(subjectType,subjectId,ownerId) {
    return db.prepare("insert into dislikes(subjectType,subjectId,ownerId) values (?,?,?)").run(subjectType,subjectId,ownerId).lastInsertRowid;

}

Dislikes.delete = function(subjectType,subjectId,ownerId){
    return db.prepare("delete from dislikes where subjectType = ? AND subjectId = ? AND ownerId = ?").run(subjectType,subjectId,ownerId).changes;
}



module.exports = Dislikes;