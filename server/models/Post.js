const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

let Post = {};

Post.getAll = function (){
    return db.prepare("select * from posts order by date desc").all();
}



Post.getByid = function (id){
    return db.prepare("select * from posts where id = ?" ).get(id);
}

Post.getByOwnerId = function (id){
    return db.prepare("select * from posts where ownerId = ?" ).all(id);
}


Post.getByCategory = function (category){

    return db.prepare("select * from posts where categories like ? order by date desc").all('%'+category+'%');
}

Post.create = function(post){
    return db.prepare("insert into posts ( \
        title ,\
        contentType , \
        content , \
        contentUrl , \
        ownerId ,\
        date ,\
        categories, \
        type \
        )values(\
            @title,\
            @contentType,\
            @content,\
            @contentUrl,\
            @ownerId,\
            datetime('now'),\
            @categories,\
            'Post'\
       );").run(post).lastInsertRowid;

}

Post.edit = function(post){
    return db.prepare("update posts set title = @title,contentType= @contentType , content = @content ,contentUrl = @contentUrl,categories = @categories ").run(post).changes;
}

Post.delete = function(id){
    return db.prepare("delete from posts where id = ?").run(id).changes;
}



module.exports = Post;