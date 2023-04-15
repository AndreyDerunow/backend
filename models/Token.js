const {Schema,model}= require('mongoose')
//Todo: Изменить модель
const schema = new Schema({

    accessToken: String,
    refreshToken: {type:String,required:true},
    expiresIn: {type: String, default: "1h"},
    userId: {type:Schema.Types.ObjectId,ref:'User'}
},{
        timestamps:true
})

module.exports=model('Token',schema)