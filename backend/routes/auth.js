const express = require('express');
const User = require('../models/User')
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

JWT_SECRET = 'aryanisthebest';
// ROUTE1 Create a User using: POST "/api/auth/createuser". No login required 
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5}),
] ,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry a user with this emai already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        
    //     .then(user=> res.json(user))
    //     .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})

    // res.send(req.body);
    const data ={
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({authToken});    
})

// ROUTE2 Authenticating a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email','Please enter a valid email').isEmail(),
    body('password', 'password cannot be blak').exists(),
] ,async (req,res)=>{
    let sucess = false; 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }

        const data ={
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        sucess=true;
        res.json({sucess, authToken});


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// ROUTE3 Get logged in user details using: GET "/api/auth/getuser". Login required
router.get('/getuser', fetchuser ,async (req,res)=>{
    try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

module.exports = router;