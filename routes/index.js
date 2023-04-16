const express = require('express')
const router = express.Router({mergeParams:true})

router.use('/category',require('./category.routes'))
router.use('/operation',require('./operation.routes'))
router.use('/user',require('./user.routes'))
router.use('/auth',require('./auth.routes'))


module.exports = router