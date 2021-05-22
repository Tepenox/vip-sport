-- drop table if exists notifications;

drop table if exists roles;
drop table if exists follows;
drop table if exists notifications;
drop table if exists likes;
drop table if exists dislikes;
drop table if exists postReplies;
drop table if exists posts;
drop table if exists threadReplies;
drop table if exists threads;
drop table if exists users;
drop table if exists categories;
drop table if exists subcategories;


CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    moderationPower INTEGER NOT NULL CHECK (moderationPower >= 0 AND moderationPower <= 100)
);

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
    roleId INTEGER DEFAULT 1,
    FOREIGN KEY (roleId) REFERENCES roles(id)
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    parentId INTEGER NOT NULL
);

CREATE TABLE subcategories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    parentId INTEGER NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (parentId) REFERENCES categories(id)
);

CREATE TABLE threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subcategoryId INTEGER NOT NULL,
    title TEXT NOT NULL,
    ownerId INTEGER NOT NULL,
    date TEXT NOT NULL,
    isPinned BOOLEAN NOT NULL DEFAULT 0,
    isLocked BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);
CREATE TABLE threadReplies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    threadId INTEGER NOT NULL,
    ownerId INTEGER NOT NULL,
    date TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id),
    FOREIGN KEY (threadId) REFERENCES threads(id) ON DELETE CASCADE
);

CREATE TABLE likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subjectId INTEGER NOT NULL,
    subjectType TEXT NOT NULL,
    ownerId INTEGER NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id)
);

CREATE TABLE dislikes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subjectId INTEGER NOT NULL,
    subjectType TEXT NOT NULL,
    ownerId INTEGER NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id)
    
);

CREATE TABLE posts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    contentType TEXT NOT NULL, -- text
    content TEXT , 
    contentUrl TEXT , 
    ownerId INTEGER NOT NULL,
    date TEXT NOT NULL,
    categories TEXT NOT NULL,
    type TEXT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE postReplies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER NOT NULL,
    content TEXT NOT NULL,
    ownerId INTEGER NOT NULL,
    type TEXT NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users(id), 
    FOREIGN KEY (postId) REFERENCES posts(id)
);


CREATE TABLE notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    fromId INTEGER NOT NULL,
    receiverId INTEGER NOT NULL,
    date TEXT NOT NULL,
    objectId INTEGER NOT NULL,
    FOREIGN KEY (fromId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
);

CREATE TABLE follows(
    followerId INTEGER,
    followedId INTEGER,
    PRIMARY KEY (followerId, followedId),
    FOREIGN KEY (followerId) REFERENCES users(id),
    FOREIGN KEY (followedId) REFERENCES users(id)
);


INSERT INTO roles(name, moderationPower)
VALUES  ("Membre", 0),
        ("Modérateur", 50),
        ("Administrateur", 100);


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
        "$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u",
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
        height,
        roleId
    )
VALUES (
        'sesh',
        'dorian',
        'volt',
        '../assets/pp.png',
        22,
        'sesh@gmail.com',
        "$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u",
        "Puceau moi ? Sérieusement ^^ haha on me l avait pas sortie celle la depuis loooongtemps 🙂 demande a mes potes si je suis puceau tu vas voir les réponses que tu vas te prendre XD rien que la semaine passee j ai niquer dont chuuuuut ferme la puceau de merde car toi tu m as tout tout l air d un bon puceau de merde car souvent vous etes frustrer de ne pas BAISER 🙂 ses agreable de se faire un missionnaire ou un amazone avec une meuf hein ? tu peux pas répondre car tu ne sais pas ce que c ou alors tu le sais mais tu as du taper dans ta barre de recherche « missionnaire sexe » ou « amazone sexe » pour comprendre ce que c etait mdddrrr !! cest grave quoiquil en soit....pour revenir a moi, je pense que je suis le mec le moins puceau de ma bande de 11 meilleurs amis pas psk j ai eu le plus de rapport intime mais psk j ai eu les plus jolie femme que mes amis 😀 ses pas moi qui le dit, ses eux qui commente sous mes photos insta « trop belle la fille que tu as coucher avec hier en boite notamment! » donc après si tu veux",
        "cyclisme",
        70,
        200,
        2
    ),
    (
        'Gigachad',
        'Chad',
        'REDACTED',
        'https://cdn.discordapp.com/attachments/582696736963821569/842759537655939142/unknown.png',
        30,
        'gigachad@gmail.com',
        '$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u',
        'Bonjour.',
        'Tous',
        80,
        200,
        3
    ),(
        'Dorian',
        'Dorian',
        'Volt',
        'https://steamuserimages-a.akamaihd.net/ugc/950731295329353962/95DE977C77C191A732A29A68AB72A19CD644F7F2/',
        20,
        'vdoralex@gmail.com',
        "$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u",
        "Where is Candice ?",
        "Cyclisme/Musculation",
        75,
        180,
        3
    ),(
        'Nairod',
        'Nairod',
        'Tolv',
        'https://steamuserimages-a.akamaihd.net/ugc/267220742942030776/ACCDA599A23603541C1C35D20FC9FB2B41C01295/',
        20,
        'playernoodle@gmail.com',
        "$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u",
        "I found Candice.",
        "Escalade de l'Olympe",
        57,
        180,
        2
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
        'Hugo',
        'hugo',
        'sanchez',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fleap-fitness-group-home-workout.fr.uptodown.com%2Fandroid&psig=AOvVaw0GGvIgNQ-8bgwu4sxChF95&ust=1621775026278000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNC11fas3fACFQAAAAAdAAAAABAD',
        21,
        'hugosanchez@gmail.com',
        "$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u",
        "Essaie de se motiver à faire du sport",
        "Actuellement aucun",
        47,
        167  
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
        'Oguh',
        'Oguh',
        'zehcnas',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.fr%2FREDWPQ-Dwayne-Johnson-Affiche-Impression%2Fdp%2FB07WRBW9PV&psig=AOvVaw0l0GbN5Fyag-cV5wsYq_3_&ust=1621775774975000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDpsN2v3fACFQAAAAAdAAAAABAD',
        21,
        'therock@gmail.com',
        "$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u",
        "Starfoubinks le sang, ca pousse à la salle un rouge par semaine le sang ! Abonnes toi tu prendras 15kg de muscle instantanément le sang",
        "Bodybuilder, Acteur, Producteur, Catcheur, Routier, Boxeur, Forgeron",
        118,
        196
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
        'RicardoMilos',
        'Ricardo',
        'Milos',
        'https://image.noelshack.com/fichiers/2019/07/2/1549988274-ezgif-1-410bb9608c45-min.gif',
        25,
        'ricardomilos@gmail.com',
        "$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u",
        "ahaaa",
        "aucun",
        121,
        220
    ),
    (
        'Temsoka',
        'Adriano',
        'Toronto',
        'https://cdn.discordapp.com/attachments/582696736963821569/841646970362920980/cdn_discordapp_com-480aae5c8d082d9eb2a5cceb2df887c0.png',
        21,
        'temsoka@gmail.com',
        "$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u",
        "Oui",
        "muscu",
        60,
        190
    ),
    (
        'Tintintamarre',
        'Jean-Gaspard',
        'Feur',
        'https://pbs.twimg.com/media/EOk4KsZX0AAFNo4?format=jpg&name=large',
        22,
        'tintintamarre@gmail.com',
        '$2b$10$/nJ68kDy/44jTpZqFXrDYOvYsJnlbYPvk7A7lPYZj6KMxMMHPtF6u',
        "Feur",
        "course",
        72,
        200
    );

insert into categories(
    name, parentId
)
values ("Site", 0), ("Général", 0);

insert into subcategories(
    name, parentId, description
)
values  ("Annonces", 1, "Cette section regroupe toutes les annonces importantes du forum."),
        ("Suggestions", 1, "Vous avez une suggestion pour le site ? Vous pouvez la proposer ici."),
        ("Signaler un bug", 1, "Vous avez rencontré un problème ? Signalez-le ici."),
        ("Entraide", 2, "Vous avez des questions par rapport à un exercice ? Vous pouvez obtenir de l'aide auprès de nos membres ici."),
        ("Discussions générales", 2, "Pour discuter de sujet sérieux."),
        ("Forum libre", 2, "Pour discuter de tout et de rien.");


insert into threads(
        subcategoryId,
        title,
        ownerId,
        date
    )
values(
        5,
        'Alors comme ça on me traite de FAIBLE ?',
        4,
        datetime('now')
    );
    
insert into threadReplies(threadId, ownerId, date, content)
values (
        1, 4, datetime('now'),
        'faible moi ? serieusement ^^ haha on me l avait pas sortie celle la depuis loooongtemps :) demande a mes potes si je suis 
        faible tu vas voir les reponses que tu vas te prendre XD rien que la semaine passee j ai soulevé donc chuuuuut ferme la 
        faible de merde car oui toi tu m as tout l air d un bon faible de merde car souvent vous etes frustrer de ne pas avoir de
          MUSCLES :) ses agreable de soulever des haltères ou un faire des pompes avec ses potes hein? tu peux pas repondre
           car tu ne sais pas ce que c ou alors tu le sais mais tu as du taper dans ta barre de recherche "haltères muscles" ou 
           "pompes muscles" pour comprendre ce que c etait mdddrrr !! c est grave quoiquil en soit.... pour revenir a moi, je pense 
           que je suis le mec le moins faible de ma bande de 11 meilleurs amis pas psk j ai le plus de muscles mais psk j ai fais les 
           meilleurs exercices que mes amis :D ses pas moi qui le dit, ses eux qui commente sous mes photos insta "trop belle la 
           pompe que tu as fait hier en salle notamment!" donc apres si tu veux que sa parte plus loi sa peut partir vraiment loi 
           j habite dans la banlieue de niort sa te parle steven sanchez ? ses juste un cousin donc OKLM hahaha on verra si tu parles encore 
           le faible de merde mdddrrr pk insulter qd on est soi meme faible tu me feras toujour marrer!!'
    ),
    (
        1, 5, datetime('now'),
        "??? Fréro il t'arrives quoi ?"
    ),
    (
        1, 6, datetime('now'),
        "feur"
    ),
    (
        1, 5, datetime('now'),
        "ah ok"
    );


insert into posts ( 
    title ,
    contentType , -- text
    content , 
    contentUrl , 
    ownerId ,
    date ,
    categories,
    type 
    )values(
        "est ce que avoir un imc de 17 est normal ?",
        "text",
        "c est pas normal mon imc , a laide , je veux pas finir comme cedric ",
        "",
        2,
        datetime('now'),
        'cyclisme',
        "Post"
   );

   insert into postReplies(
    postId ,
    content ,
    ownerId ,
    type,
    date 
   )values(
       1,
       "frere te renchoouf ",
       1,
       "PostComment",
       datetime('now')
   );

   insert into likes(
       subjectId,
       subjectType,
       ownerId
   )values(
       1,
       "Post",
       1
   ),(
       1,
       "Post",
       2
   ),(
       1,
       "Post",
       3
   ),(
       1,
       "PostComment",
       1
   ),
   (
       1,
       "PostComment",
       2
   );

--    insert into notifications (
--     type  ,
--     fromId  ,
--     receiverId  ,
--     date  ,
--     objectId  
--    ) values (
--        "PostComment",
--         2,
--         1,
--         datetime('now'),
--         1
--    ),(
--        "PostComment",
--         3,
--         1,
--         datetime('now'),
--         1
--    ),(
--        "PostComment",
--         4,
--         1,
--         datetime('now'),
--         1
--    );
