const express = require('express');
const cors = require('cors');




const port = 3000;

const Users = require('./routes/Users');

const app = express();

app.use(cors());


app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());


app.use('', Users);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});