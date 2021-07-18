const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const colors = require('colors');
const connectdb = require('./config/db');

dotenv.config({
    path: '.env',
});

connectdb();

const { urlencoded } = require('express');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }))
app.use(cookieParser());
app.use(cors());



app.use('/', express.static(path.join(__dirname, 'files')));
// app.use('/', express.static(path.join(__dirname, 'Files')));



// Routes
 app.use('/api', require('./routes/userRouter'));



const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on port at http://localhost:${PORT}`.yellow .bold);
})
