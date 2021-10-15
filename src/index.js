const express = require('express')
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose')

const app = express();
const cors = require('cors');

//MIDDELWARES
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors());

//DATABASE SETUP
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('Successfully conection'))

//ROUTES
app.use('/email', require('./routes/email'));
app.use('/admin', require('./routes/adminAuth'));
app.use(express.static(path.join(__dirname, 'public')));


//LISTEN TO PORT
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server on port ${process.env.PORT}`)
});



