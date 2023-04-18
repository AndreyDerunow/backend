const express = require('express')
const Category = require('../models/Category')
const User = require('../models/User')
const router = express.Router({mergeParams:true})
const auth = require('../middleware/auth.middleware')

router.get('/',async (req, res)=>{
    try{
        const list = await Category.find()
        res.status(200).send(list)
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }
})
router.get('/myCategories',auth,async (req, res)=>{
    try{
        const userId = req.user._id
        const list = await Category.find()
        const filteredList =  list.filter(c=>{
           if((c.creator && c.creator.toString() === userId)||c.default)return true
        })
        res.status(200).send(filteredList)
    }catch(e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }
})
router.post('/',auth,async (req, res)=>{
    try{
        const userId = req.user._id
        const newCategory = await Category.create({
            ...req.body,creator:userId,default:false
        })
        const userCreating = await User.findById(userId)
        const categoryList = [...userCreating.categories,newCategory._id]
        await User.findByIdAndUpdate(userId,{categories:categoryList})
        res.status(201).send(newCategory)
    }catch (e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }

})
router.patch('/:categoryId',auth,async (req, res)=>{
    try{
        const {categoryId} = req.params
        const userId = req.user._id
        const userUpdating = await User.findById(userId)
        if(userUpdating.categories.includes(categoryId)){
            const updatedCategory = await Category.findByIdAndUpdate(categoryId,req.body,{new:true})
            res.status(200).send(updatedCategory)
        }else{
            return res.status(400).json({
                message: "Недостаточно прав."
            })
        }
    }catch (e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }

})

router.delete('/:categoryId',auth,async (req, res)=>{
    try{
        const {categoryId} = req.params
        const userId = req.user._id
        const userDeleting = await User.findById(userId)
        if(userDeleting.categories.includes(categoryId)){
            await Category.findByIdAndDelete(categoryId)
            const {categories} = userDeleting
            const categoryList = categories.filter(c=>c.toString()!==categoryId)
            await User.updateOne({_id:userId},{categories:categoryList})
            res.status(200).send(null)
        }else{
            return res.status(400).json({
                message: "Недостаточно прав."
            })
        }
    }catch (e){
        res.status(500).json({message: "На сервере произошла ошибка. Попробуйте позже",payload: e.message})
    }

})



module.exports = router