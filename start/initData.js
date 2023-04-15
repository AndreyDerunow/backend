const Category = require('../models/Category')
const categoryMock = require('../mock/category.json')

module.exports= async ()=>{
    const category = await Category.find()
    if(category.length<categoryMock.length){
        await createInitialEntities(Category,categoryMock)
    }
}

async function createInitialEntities(Model, data){
    await Model.collection.drop()
    return Promise.all(
        data.map( async (item)=>{
            try{
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            }catch(e){
               return e
            }
        })
    )

}