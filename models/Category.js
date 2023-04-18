const {Schema,model}=require('mongoose')

const schema = new Schema({
    name: { type:String,
            required: true
    },
    icon:{ type: String,
           default: 'some default icon'
    },
    default: {
        type: Boolean,required: true
    },
    creator:{
        type: Schema.Types.ObjectId, ref:'User'
    }
},{
    timestamps: true
})

module.exports = model('Category',schema)