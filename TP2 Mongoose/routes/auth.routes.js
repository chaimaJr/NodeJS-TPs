const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

router.post('/register', async(req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = new User({name, email, password});
        await user.save();
        res.status(201).send({message: "User added successfully", user})

    } catch (error){
        res.status(400).send({message: "Failed to add user", error:error.message})
    }
});

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email}); 

        if(!user){
            res.status(404).send({message: "User not found"});
        }

        const isCorrectPassword = user.comparePassword(password);

        if(!isCorrectPassword){
            res.status(404).send({message: "Invalid credentials"});
        }

        const token = await jwt.sign({userId: user._id}, process.env.SECRET_KEY);
        res.send({message: "User logged in successfully", token})


    } catch (error){
        res.status(400).send({message: "Failed to login", error:error.message})
    }
});

router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password')   // everything except password
        if(!user){
            res.status(404).send({message: "User not found"});
        }
        res.send(user);

    } catch (e) {
        res.status(500).send({message: e.message});
    }
})

module.exports = router