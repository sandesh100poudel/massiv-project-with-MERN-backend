const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');



const app = express();
app.use(bodyParser.json());

let corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 ,
    credentials: true
};

app.use(cors(corsOptions));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Acess-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
})

app.use('/api/places',placesRoutes);
app.use('/api/users',usersRoutes);

mongoose.connect('mongodb+srv://anjita:dfPnktDsOAvw7ueh@cluster0.y8bjkek.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("successfully connected to database atlas");
}).catch(e=>

    console.log(e)
)


app.listen(5000, ()=>{
    console.log('server running...')
});