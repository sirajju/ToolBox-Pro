const User = require('../models/usermodel');
const md5 = require('md5');

const adminHome = async(req,res)=>{
    try{
        res.render('login');
    }
    catch(error){
        console.log(error.message)
    }
}
const loadAdmin = async(req,res)=>{
    try{
        admin = req.body.admin_name
        pass = req.body.admin_pass;
        const UserData = await User.findOne({email:admin})
        if(UserData && UserData.is_admin==1){
            if(UserData.pass==pass){
                const Users = await User.find({});
                res.render('home',{UserData:Users});
            }else{
               res.send('Login fail'); 
            }
        }
        else{
            res.send('UserNot Found!');
        }
    }
    catch(error){
        console.log(error.message);
    }
}

const deleteUser = async(req,res)=>{
    try {
        const UserId = req.query.id;
        const DeleteData = await User.deleteOne({_id:UserId});
        if(DeleteData){
            res.send('User deleted');
        }
    } catch (error) {
        console.log(error.message);
    }
}

const addUserLoad = async(req,res)=>{
    try {
        res.render('add');
    } catch (error) {
        
    }
}
const saveUser = async(req,res)=>{
    try {
        const user = req.body.username;
        const is_admin = req.body.is_admin;
        const key = md5(user)
        const userData = new User({
            email:user,
            is_admin:is_admin,
            key:key
        })
        const proc = userData.save();
        if(proc){
            res.render('add',{msg:"User added"})
        }

    } catch (error) {
        console.log(error.message);
    }
}
module.exports={
    adminHome,
    loadAdmin,
    deleteUser,
    addUserLoad,
    saveUser
}