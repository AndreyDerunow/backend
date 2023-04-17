const express = require('express')
const User = require("../models/User");
const auth = require('../middleware/auth.middleware')
const router = express.Router({mergeParams:true})


//все
router.get('/',auth, async (req, res)=>{
    try{
        const list = await User.find()
        res.status(200).send(list)
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже"})
    }
})
router.get('/:userId', auth, async (req, res)=>{
    try{
        const {userId} = req.params
        const user = await User.findById(userId)
        if(!user){
            return res.status(500).json({
                message: `user ${userId} not found`
            })
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже", error: e.message})
    }
})
router.patch('/:userId',auth, async (req, res)=>{
    try{
        const authUserId = req.user._id
        const {userId} = req.params
        if(userId===authUserId){
            const updatedUser = await User.findByIdAndUpdate(userId,req.body,{new:true})
            res.status(200).send(updatedUser)
        }else{
            return res.status(401).json({message:"Unauthorized"})
        }

    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже", error: e.message})
    }
})


module.exports = router