const express = require('express')
const Operation = require("../models/Operation");
const router = express.Router({mergeParams:true})

router.get('/',async (req,res)=>{
    try{
        const list = await Operation.find()
        res.status(200).send(list)
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }
})
router.post('/',()=>{})
router.delete('/:operationId',()=>{})
router.patch('/:operationId',()=>{})


module.exports = router