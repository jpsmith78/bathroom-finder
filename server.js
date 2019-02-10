//==========Dependencies==========//
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');

app.use(express.json());
app.use(express.static('public'));



app.use(session({
    secret:'feedmeseymour',
    resave: false,
    saveUninitialized: false
}));




const bathroomController = require('./controllers/bathrooms.js');
app.use('/bathrooms', bathroomController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

const userController = require('./controllers/users.js');
app.use('/users', userController);

//==========Connections==========//

app.listen(3000, () => {
  console.log('Listening...');
});


app.get('/checkIfLoggedIn',(req,res) => {
  res.json(req.session)
})

//sending api apiKey

app.get('/getApiKey',(req,res) => {
  res.send(process.env.GOOGLEMAPAPI)
})



mongoose.connect('mongodb://localhost:27017/project_3', {useNewUrlParser: true});
mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
});
