const dotenv = require('dotenv')
dotenv.config();
const dbconnect = require("./config/connection");
dbconnect.dbconnect()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

app.use((req, res, next) => {
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(morgan('dev'))

app.use(express.static('public/users'));
app.use(express.static('public/admin'));

app.use('/',userRoute);
app.use('/admin',adminRoute);
// const port = Math.floor(Math.random() * 9000);
const port =3000
app.listen(port,()=>{
    console.log("Started on http://localhost:"+port);
    // console.log('http://localhost:'+port+'/send?to=munnas2aa@gmail.com&message=last&user=munns2aa@gmail.com')
})
