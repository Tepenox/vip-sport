-- drop table if exists notifications;
drop table if exists users;
drop table if exists threads;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    age INTEGER NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    description TEXT NOT NULL,
    isAdmin TEXT DEFAULT 'false'
);
CREATE TABLE threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    ownerId TEXT NOT NULL,
    date TEXT NOT NULL,
    categories TEXT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);
-- CREATE TABLE notifications (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     type TEXT NOT NULL,
--     fromId INTEGER NOT NULL,
--     -- the one who caused the notification
--     receiverId INTEGER NOT NULL,
--     date TEXT NOT NULL,
--     objectId INTEGER NOT NULL,
--     -- useful te redirect to the object that caused the notification , if we won t need it , the object id will be -1
--     FOREIGN KEY (from_id) REFERENCES users(id),
--     FOREIGN KEY (receiver_id) REFERENCES users(id)
-- );
insert INTO users(
        username,
        firstName,
        lastName,
        age,
        email,
        password,
        description
    )
VALUES (
        'anasselafya',
        'anass',
        'el afya',
        23,
        'anasselafya@gmail.com',
        "password",
        "puceau ? moi ? serieusement ?"
    );

insert into threads(
    title ,
    ownerId ,
    date ,
    categories 
)values(
    'is being virgin at the age of 23 a problme',
    1,
    datetime('now'),
    'sports'
);