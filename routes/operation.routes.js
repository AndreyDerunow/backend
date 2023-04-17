const express = require('express')
const Operation = require("../models/Operation");
const User = require("../models/User");
const router = express.Router({mergeParams:true})
const auth = require('../middleware/auth.middleware')

router.get('/myOperations',auth,async (req,res)=>{
    try{
        const userId = req.user._id
        const list = await Operation.find({userId})
        res.status(200).send(list)
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }
})
router.get('/',auth,async (req,res)=>{
    try{
        const list = await Operation.find()
        res.status(200).send(list)
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }
})
router.post('/',auth,async (req,res)=>{
    try{
        const userId = req.user._id

        const newOperation = await Operation.create({
            ...req.body, userId
        })
        const {operations} = await User.findById(userId)
        await User.updateOne({_id:userId},{operations:[...operations,newOperation._id]},{new:true})
        res.status(201).send({newOperation})
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }
})
router.delete('/:operationId',auth,async (req,res)=>{
    try{
        const userId = req.user._id
        const {operationId} = req.params
        const userDeleting = await User.findById(userId)
        if(userDeleting.operations.includes(operationId)){
            await Operation.findByIdAndRemove(operationId)
            const {operations} = userDeleting
            const operationsList = operations.filter(o=>o.toString()!==operationId)
            await User.updateOne({_id:userId},{operations:operationsList})
            res.status(200).send(null)
        }else{
            return res.status(400).json({
                message: "Недостаточно прав."
            })
        }
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }
})
router.patch('/:operationId',auth,async (req,res)=>{
    try{
        const userId = req.user._id
        const {operationId} = req.params
        const userUpdating = await User.findById(userId)
        if(userUpdating.operations.includes(operationId)){
            const updatedOperation = await Operation.findByIdAndUpdate(operationId,req.body,{new:true})
            res.status(200).send(updatedOperation)
        }else{
            return res.status(400).json({
                message: "Недостаточно прав."
            })
        }
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }
})


module.exports = router