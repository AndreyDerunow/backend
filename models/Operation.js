const {Schema,model} = require('mongoose')
//Todo: category ( {type: Schema.Types.ObjectId, ref: 'Category'} )
const schema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:'User'},
    sum: String,
    comment: String,
    type: {type:String,enum:['take off','top up'], required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'}
},{
    timestamps:{createdAt:'created_at'}
})


module.exports=model('Operation',schema)