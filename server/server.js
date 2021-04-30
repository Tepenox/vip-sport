const express = require('express');
const cors = require('cors');




const port = 3000;

const User = require('./routes/User');

const app = express();

app.use(cors());


app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());


app.use('', User);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});