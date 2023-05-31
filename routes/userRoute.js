const express = require('express');
const userRoute = express();
const userController = require('../controller/userController.js');
const adminController = require('../controller/adminController.js')
const path = require('path');

userRoute.set('view engine','ejs');
userRoute.set('views',path.join(__dirname,'../views/users'));

userRoute.get('/send?',userController.sendMail);
userRoute.get('/',userController.loadHome);

userRoute.post('/',userController.sendOtp);
userRoute.post('/verifyOtp',userController.checkUser);

module.exports = userRoute