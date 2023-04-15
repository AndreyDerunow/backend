const {Schema,model}=require('mongoose')

const schema = new Schema({
    name: { type:String,
            required: true
    },
    icon:{ type: String,
           default: 'some default icon'
    }
},{
    timestamps: true
})

module.exports = model('Category',schema)