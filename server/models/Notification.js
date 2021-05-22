const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Notification = {};

Notification.getById = function(id){
    return db.prepare("select * from notifications where id = ?").get(id);
}
Notification.getByDettails=function (notification){
    return db.prepare("select * from notifications where type = @type and fromId = @fromId and receiverId = @receiverId and objectId = @objectId").get(notification);
}

Notification.getByReceiverId  = function (receiverId){
    return db.prepare("select * from notifications where receiverId = ?").all(receiverId);
}

Notification.create  = function (notification){
    return db.prepare("insert into notifications (type,fromId,receiverId,date,objectId) values(@type,@fromId,@receiverId,datetime('now'),@objectId)").run(notification).lastInsertRowid;
}

Notification.delete = function(id){
    return db.prepare("delete from notifications where id = ? ").run(id).changes;
}

module.exports = Notification;
