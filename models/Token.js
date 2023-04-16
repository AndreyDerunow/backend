const {Schema,model}= require('mongoose')
//Todo: Изменить модель
const schema = new Schema({

    refreshToken: {type:String,required:true},
    user: {type:Schema.Types.ObjectId,ref:'User'}
},{
        timestamps:true
})

module.exports=model('Token',schema)