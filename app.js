const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');


const app = express();

app.use('/api/users',placesRoutes);

app.listen(3500, ()=>{
    console.log('server running...')
});