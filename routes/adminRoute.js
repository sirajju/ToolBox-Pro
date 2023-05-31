const express = require('express');
const adminRoute = express();
const adminController = require('../controller/adminController.js')
const path = require('path');

adminRoute.set('view engine','ejs');
adminRoute.set('views',path.join(__dirname,'../views/admin'));

adminRoute.get('/',adminController.adminHome);
adminRoute.get('/add',adminController.addUserLoad);

adminRoute.post('/',adminController.loadAdmin);
adminRoute.post('/add',adminController.saveUser);
adminRoute.post('/delete',adminController.deleteUser);


module.exports = adminRoute
