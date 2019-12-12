import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router();//eslint-disable-line


//get all users
router.get('/', asyncHandler(async(req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}));

//authenticate user with asycn handler
router.post('/', asyncHandler(async(req,res) => {
    if(!req.body.email || !req.body.password) {
        res.json({
            success: false,
            msg: 'Invalid Email or Password'
        });
    }
    if(req.query.action === 'register') {
        const newUser = new User({
            email:req.body.email,
            password: req.body.password,
        });
        //save a new user
        await newUser.save();
        res.status(201).json({
            success:true,
            msg:'Created new user'
        });
    }else {
        const user = await User.findByEmail(req.body.email);
        if(!user) return res.status(401).send({success:false, msg:"Authentication failes, User Not found"});
        user.comparePassword(req.body.password,(err, isMatch) => {
            if(isMatch && !err) {
                //user is found and password correct, create a token
                const token = jwt.sign(user.email, process.env.secret);
                //return information with token as json
                res.status(200).json ({
                    success:true,
                    token:'BEARER' + token,
                });
            }else {
                res.status(401).send({
                    success:false,
                    msg:'Authentication failled, incorrect password'
                });
            }
        });
    }
}));

export default router;