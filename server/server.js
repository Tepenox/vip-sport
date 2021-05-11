const express = require('express');
const cors = require('cors');




const port = 3000;

const Users = require('./routes/Users');
const Posts = require('./routes/Posts');
const PostReplies = require('./routes/PostReplies');
const Threads = require('./routes/Threads');
const ThreadReplies = require('./routes/ThreadReplies');
const Categories = require('./routes/Categories');

const app = express();

app.use(cors());


app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());


app.use('', Users);

app.use('', Posts);

app.use('', PostReplies);

app.use('', Threads);

app.use('', ThreadReplies);

app.use('', Categories);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});