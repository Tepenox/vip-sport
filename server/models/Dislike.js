const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let dislikes = {};

dislikes.getCountBySubjectId = function (subjectType, subjectId){
    return db.prepare("select count(*) from dislikes where subjectType = ? and subjectId = ?").get(subjectType,subjectId);
}

dislikes.getDislike = function (subjectType,subjectId,ownerId){
    return db.prepare("select * from dislikes where subjectType = ? AND subjectId = ? AND ownerId = ?").get(subjectType,subjectId,ownerId);
} 

dislikes.create = function(subjectType,subjectId,ownerId) {
    return db.prepare("insert into dislikes(subjectId,subjectType,ownerId) values (?,?,?)").run(subjectType,subjectId,ownerId).lastInsertRowid;

}

dislikes.delete = function(subjectType,subjectId,ownerId){
    return db.prepare("delete from dislikes where subjectType = ? AND subjectId = ? AND ownerId = ?").run(subjectType,subjectId,ownerId).changes;
}



module.exports = dislikes;