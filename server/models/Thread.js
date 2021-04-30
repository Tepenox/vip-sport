
const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");


let Thread = {};

Thread.getByid = function (id){
     let thread = db.prepare("select * from Threads where id = ?").get(id);
    return thread;
}

Thread.getAll = function (){
    let threads = db.prepare("select * from Threads order by date DESC").all();
    return threads;
}

Thread.create= function (thread){

}

Thread.edit = function(id,thread){

}

Thread.delete = function(id) {

}


