const {Schema,model} = require("mongoose")
//Todo: operations([{type: Schema.Types.ObjectId, ref:'Operation'}]), categories({type:String,enum:['default','custom'],default: 'default'})
const schema = new Schema({
    name: String,
    balance: {type:String,default: '0'},
    email: {type:String,required: true, unique: true},
    password: {type:String,required: true},
    phone: String,
    about: String,
    image: String,
    operations: [{type: Schema.Types.ObjectId, ref:'Operation'}],
    categories: String
},{
    timestamps:true
})


module.exports = model('User',schema)