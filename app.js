const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');



const app = express();
app.use(bodyParser.json());

app.use('/api/users',placesRoutes);
app.use('/api/user',usersRoutes);

mongoose.connect('mongodb+srv://anjita:dARPsOk9MMloxx4o@cluster0.y8bjkek.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("successfully connected to database atlas");
}).catch((err)=>{
    return
    console.log(err);
})


app.listen(3500, ()=>{
    console.log('server running...')
});