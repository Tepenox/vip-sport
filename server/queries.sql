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
    weight INTEGER NOT NULL,
    height INTEGER NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    description TEXT NOT NULL,
    sport TEXT NOT NULL,
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
        description,
        sport,
        weight,
        height
    )
VALUES (
        'anasselafya',
        'anass',
        'el afya',
        'https://media.discordapp.net/attachments/833721785182191646/838767621074714724/isleep.png',
        23,
        'anasselafya@gmail.com',
        "password",
        "puceau ? moi ? serieusement ?",
        "cyclisme",
        45,
        170
    );


    insert INTO users(
        username,
        firstName,
        lastName,
        imageUrl,
        age,
        email,
        password,
        description,
         sport,
        weight,
        height
    )
VALUES (
        'sesh',
        'dorian',
        'volt',
        '../assets/pp.png',
        22,
        'sesh@gmail.com',
        "password",
        "Puceau moi ? Sérieusement ^^ haha on me l avait pas sortie celle la depuis loooongtemps 🙂 demande a mes potes si je suis puceau tu vas voir les réponses que tu vas te prendre XD rien que la semaine passee j ai niquer dont chuuuuut ferme la puceau de merde car toi tu m as tout tout l air d un bon puceau de merde car souvent vous etes frustrer de ne pas BAISER 🙂 ses agreable de se faire un missionnaire ou un amazone avec une meuf hein ? tu peux pas répondre car tu ne sais pas ce que c ou alors tu le sais mais tu as du taper dans ta barre de recherche « missionnaire sexe » ou « amazone sexe » pour comprendre ce que c etait mdddrrr !! cest grave quoiquil en soit....pour revenir a moi, je pense que je suis le mec le moins puceau de ma bande de 11 meilleurs amis pas psk j ai eu le plus de rapport intime mais psk j ai eu les plus jolie femme que mes amis 😀 ses pas moi qui le dit, ses eux qui commente sous mes photos insta « trop belle la fille que tu as coucher avec hier en boite notamment! » donc après si tu veux",
        "cyclisme",
        70,
        200
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
       2,
       datetime('now')
   );
