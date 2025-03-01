const express = require('express');
const router= express.Router();
const User = require("../models/user")


// List all

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users); 
    } catch (err){
        res.send(err)        
    }
})

// Get one
router.get('/:email', async (req, res) => {
    try{
        const user = await User.findOne({email:req.params.email});
        if(!user){
            res.status(404).send({message: "User not found"})
        }
        res.send(user);
    } catch (err){
        res.send({error: err})
    }

})



// Create

router.post('/', async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).send({message: "User added successfully", user})

    } catch (error){
        res.status(400).send({message: "Failed to add user", error:error.message})
    }
});


// Update

router.put('/:id', async(req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).send({message: "User updated successfully"})
    } catch (err) {
        res.status(400).send({message: "Failed to update user"})
    }
})


// Delete
router.delete('/delete/:id', async (req, res) => {
    try {
        await User.deleteOne({_id:req.params.id});
        res.status(200).send({message: "User deleted successfully"})
    } catch (err) {
        res.status(400).send({message: "Failed to delete user"})   
    }
})



module.exports = router;