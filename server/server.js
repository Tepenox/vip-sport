const express = require('express');
const cors = require('cors')
const path = require('path');


const user = require('./routes/User');
const port = 3000;

const app = express();
app.use(cors())


app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

app.use('', user);

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});