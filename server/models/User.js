const Sqlite = require("better-sqlite3");
const db = new Sqlite("db.sqlite");

exports.getById = function (id) {
  let user = db.prepare("select * from users where id = ?").get(id);
  return user;
};

exports.create = function (user) {
  let result = db
    .prepare(
      "insert INTO users(\
    username,\
    firstName,\
    lastName,\
    imageUrl,\
    height,\
    weight,\
    sport,\
    age,\
    email,\
    password,\
    description\
)\
VALUES (\
    @userName,\
    @firstName,\
    @lastName,\
    @imageUrl,\
    @age,\
    @email,\
    @password,\
    @description\
);"
    )
    .run(user);
  return result.lastInsertRowid; 
};

exports.edit = function (user) {
  let results = db.prepare(
    "update users set \
    userName = @userName ,\
    firstName = @firstName,\
    lastName = @lastName,\
    imageUrl = @imageUrl,\
    height= @height,\
    weight = @weight,\
    sport = @sport,\
    age = @age,\
    email = @email,\
    password= @password,\
    description = @description\
    where id = @id"
  ).run(user);
  return results;
};

exports.getByEmail= function (email) {
    let user = db.prepare("select * from users where email = ?").get(email);
    return user;
}

exports.getByUserName= function (username) {
    let user = db.prepare("select * from users where username = ?").get(username);
    return user;
}

exports.searchByUserName= function (username) {
  let users = db.prepare("select * from users where username like ?").all('%'+ username +'%'); 
  return users;
}

exports.getAllUsers= function () {
  let users = db.prepare("select * from users").all(); 
  return users;
}
//le cous va pas suprrimmer son compte 

// exports.delete = function (user) {
//   return "delete model user";
// };
