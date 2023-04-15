const express = require('express')
const User = require("../models/User");

const router = express.Router({mergeParams:true})


//все
router.get('/',async (req, res)=>{
    try{
        const list = await User.find()
        res.status(200).send(list)
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже"})
    }
})
router.get('/:userId',()=>{})
router.patch('/:userId',()=>{})


module.exports = router