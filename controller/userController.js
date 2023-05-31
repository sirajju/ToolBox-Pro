const nodemailer = require('nodemailer');
const User = require('../models/usermodel');
const dotenv = require('dotenv');
dotenv.config();
const sendMail = async (req, res) => {
    try {
        const to = req.query.to;
        const message = req.query.message;
        const user = req.query.user;

        if (user) {
            if (message != undefined || to != undefined || message != '' || to != '') {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: 'sirusiraju2aa@gmail.com',
                        pass: process.env.Password
                    }
                })
                const options = {
                    from: 'sirusiraju2aa@gmail.com',
                    to: to,
                    subject: 'ToolBox pro',
                    html: message
                }
                transporter.sendMail(options, function (error, info) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log('mail send')
                        res.render('index')
                    }
                }
                )
            }
            else {
                res.send('Permission denied (403)');
            }
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
let otp = 0;
let user;
const sendOtp = async (req, res) => {
    try {
        otp = 0;
        user = await req.body.user;
        let digits = '0123456789';
        for (let i = 0; i < 5; i++) {
            otp += digits[Math.floor(Math.random() * 10)]
            used = true;
        }
        message = 'Enter the otp ' + otp + ' to verify'
        console.log(message);
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,

            auth: {
                user: 'sirusiraju2aa@gmail.com',
                pass: process.env.Password
            }
        })
        const options = {
            from: 'sirusiraju2aa@gmail.com',
            to: user,
            subject: 'ToolBox pro',
            html: message
        }

        transporter.sendMail(options, function (error, info) {
            if (error) {
                if (error.name = 'Error') {
                    res.render('otpPage', { msg: "Something went wrong!!" })
                }
            } else {
                res.render('otpPage', { msg: "Please check your inbox to get otp" })
                console.log('mail send')
                delete otp;
            }
        }
        )
    }
    catch (error) {
        console.log(error.message);
    }
}

const checkUser = async (req, res) => {
    try {
        num = await req.body.otp;
        console.log(user);
        if (num == otp) {
            const UserData = await User.findOne({ email: user });
            console.log(UserData);
            if (UserData) {
                res.render('home', { userData: UserData, msg: "Thank you for choosing premium" })
            }
            else {
                res.render('home', { userData: false, msg: "You are not a prime member !" });
            }
        }
        else {
            res.render('otpPage', { msg: "Invalid Otp" })
        }
    }
    catch (error) {
        console.log(error.message);
    }
}
const loadHome = async (req, res) => {
    try {
        res.render('index');
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    sendMail,
    loadHome,
    checkUser,
    sendOtp,
}