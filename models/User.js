const {Schema,model} = require("mongoose")
const defaultImage = require('../utils/generateDefaultImage')

const schema = new Schema({
    name: String,
    balance: {type:String,default: '0'},
    email: {type:String,required: true, unique: true},
    password: {type:String,required: true},
    phone: String,
    about: String,
    image: {type:String,default:defaultImage() },
    operations: [{type: Schema.Types.ObjectId, ref:'Operation'}],
    categories: [{type: Schema.Types.ObjectId, ref:'Category'}]
},{
    timestamps:true
})


module.exports = model('User',schema)