-- drop table if exists notifications;
drop table if exists postReplies;
drop table if exists posts;
drop table if exists threadReplies;
drop table if exists threads;
drop table if exists users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    imageUrl TEXT NOT NULL,
    age INTEGER NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    description TEXT NOT NULL,
    isAdmin TEXT DEFAULT 'false'
);
CREATE TABLE threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    ownerId INTEGER NOT NULL,
    date TEXT NOT NULL,
    categories TEXT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);
CREATE TABLE threadReplies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    threadId INTEGER NOT NULL,
    content TEXT NOT NULL,
    ownerId INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id),
    FOREIGN KEY (threadId) REFERENCES threads(id)
);

CREATE TABLE posts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    contentType TEXT NOT NULL, -- text
    content TEXT , 
    contentUrl TEXT , 
    ownerId INTEGER NOT NULL,
    date TEXT NOT NULL,
    categories TEXT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

CREATE TABLE postReplies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER NOT NULL,
    content TEXT NOT NULL,
    ownerId INTEGER NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id)
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
        imageUrl,
        age,
        email,
        password,
        description
    )
VALUES (
        'anasselafya',
        'anass',
        'el afya',
        'https://media.discordapp.net/attachments/833721785182191646/838767621074714724/isleep.png',
        23,
        'anasselafya@gmail.com',
        "password",
        "puceau ? moi ? serieusement ?"
    );
insert into threads(
        title,
        ownerId,
        date,
        categories
    )
values(
        'is being virgin at the age of 23 a problme',
        1,
        datetime('now'),
        'sports'
    );
    
insert into threadReplies(threadId, content, ownerId, date)
values (
        1,
        "u need to build de mooosskles",
        1,
        datetime('now')
    );


insert into posts ( 
    title ,
    contentType , -- text
    content , 
    contentUrl , 
    ownerId ,
    date ,
    categories 
    )values(
        "est ce que avoir un imc de 17 est normal ?",
        "text",
        "c est pas normal mon imc , a laide , je veux pas finir comme cedric ",
        "",
        1,
        datetime('now'),
        'cyclisme'
   );

   insert into postReplies(
    postId ,
    content ,
    ownerId ,
    date 
   )values(
       1,
       "frere te renchoouf ",
       1,
       datetime('now')
   );