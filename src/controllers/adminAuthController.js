const AdminUser = require('../models/AdminUser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// Register
exports.signup = (req, res) =>{
    console.log('req.body: ', req.body);
    const adminUser = new AdminUser(req.body);
    adminUser.save((error, adminUser)=>{
        if (error) {
            return res.status(400).json({
                error: "Revise los campos, tiene algún error."
            })
        }
        adminUser.salt = undefined;
        adminUser.hashed_password = undefined;
        res.json({adminUser})
    })
}



//Login
exports.signin = (req, res) =>{
    const {username, password} = req.body;
    AdminUser.findOne({username}, (error, adminUser)=>{
        if(error||!adminUser){
            return res.status(400).json({
                error: 'El usuario que esta ingresando es incorrecto'
            });
        }

        if (!adminUser.authenticate(password)) {
            return res.status(401).json({
                error: "Usuario y contraseña no coinciden"
            });
        }
        const token = jwt.sign({_id:adminUser._id}, process.env.JWT_SECRET);
        res.cookie('t', token, {expire: new Date() + 9999});

        const {_id, username} = adminUser;
        return res.json({
            token, 
            user:{
                _id, username
            }
        })
    })
}


exports.signout = (req, res) =>{
    res.clearCookies('t');
    res.json({message: "Signout success"})
}